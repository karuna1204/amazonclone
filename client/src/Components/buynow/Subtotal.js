import React from 'react'
import { useEffect,useState } from 'react';


const Subtotal = ({iteam, quantityMap}) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
      totalAmount();
    localStorage.setItem('quantityMap', JSON.stringify(quantityMap));
  }, [iteam, quantityMap]);

  const totalAmount = () => {
      let price = 0
      iteam.map((item)=>{
  const quantity = quantityMap[item.id] || 1; // Default quantity is 1
       price += item.price.cost * quantity; 
      });
      setPrice(price)
  }
  return (
    <div>
       <div className="sub_item">
            <h3>Subtotal ({iteam.length} items)<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    </div>
  )
}

export default Subtotal
