import React, { useContext,useEffect } from 'react'
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({deletedata,get, selectedQuantity, handleQuantityChange}) => {
  const { account, setAccount } = useContext(LoginContext);


      const removedata = async (id) => {
        try {
            const res = await fetch(`https://amazon-clone1-api1.vercel.app/remove/${deletedata}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": account.tokens[0].token
                },
                credentials: "include"
            });

            const data = await res.json();
            // console.log(data);

            if (res.status === 400 || !data) {
                console.log("error aai remove time pr");
            } else {
              // console.log("deleted")
                setAccount(data)
                get();
                toast.success("Iteam remove from cart 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log(error);
        }

    }
   const handleChange = (e) => {
      const newQuantity = parseInt(e.target.value, 10);
      
      handleQuantityChange(deletedata, newQuantity);
    };
  
    useEffect(() => {
      handleQuantityChange(deletedata, selectedQuantity);
    }, [deletedata, selectedQuantity, handleQuantityChange]);
  return (
    <div className="add_remove_select">
    <select  name="quantity"
        id={`quantity-${deletedata}`}
        value={selectedQuantity}
        onChange={handleChange}
        >
         {[1, 2, 3, 4]?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
    </select>
    <p style={{ cursor: "pointer" }} onClick={()=>removedata(deletedata)}>Delete</p><span>|</span>
    <p className="forremovemedia">Save Or Later</p><span>|</span>
    <p className="forremovemedia">See More like this</p>
    <ToastContainer />
</div>
  )
}

export default Option
