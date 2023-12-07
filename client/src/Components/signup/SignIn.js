import React, { useContext, useState } from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


const SignIn = () => {
    // const { account, setAccount } = useContext(Logincontext);
    const navigate = useNavigate("");

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    // console.log(data);

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
        try {
            const res = await fetch("https://amazon-clone1-api1.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
            // console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Email and Password not match!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                document.cookie = "Amazonweb=data.tokens[0].token; path=/; HttpOnly";
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfully done!", {
                    position: "top-center"
                });
                 navigate('/');
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    };
    

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://www.pngmart.com/files/Amazon-Logo-PNG-Image.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                       
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <button>  <NavLink to="/register">Create your Amazon Account</NavLink></button>
                </div>
            </div>

        </section>
    )
}

export default SignIn;
