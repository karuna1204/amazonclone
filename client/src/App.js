/** @format */

import "./App.css";
import Navbar from "./Components/header/Navbar";
import Newnav from "./Components/newnavbaar/Newnav";
import Maincomp from "./Components/home/Maincomp";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/signup/SignIn";
import SignUp from "./Components/signup/SignUp";
import Cart from "./Components/cart/Cart";
import Buynow from "./Components/buynow/Buynow";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [data, setData] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      )}
    </>
  );
}

export default App;
