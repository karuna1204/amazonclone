import React from 'react'
import { useEffect,useState } from 'react';

const Right = ({iteam, quantityMap}) => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
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
    <div className="right_buy">
    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
    <div className="cost_right">
        <p>Your order is eligible for FREE Delivery. <br />
            <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
        <h3>Subtotal ({iteam.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
        <button className="rightbuy_btn" >Proceed to Buy</button>
        <div className="emi">
            Emi available
            {/* {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
        </div>
        {/* <span className={val ? "show" : "hide"}> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
            Jewelry, Gift cards and Amazon pay balance top up). Learn more</span> */}
    </div>
</div>
)
}

export default Right
