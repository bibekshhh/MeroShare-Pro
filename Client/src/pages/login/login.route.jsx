import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginArt from './artt.svg'
import "../css/login.css"
import { Notification } from "@arco-design/web-react";

import config from "../../config";

const Login = ({logStatus}) => {
    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = async (e) => {
        e.preventDefault();

        if(!email || !password) {
           return Notification.error({ 
            title: "Error",
            content: "All fields are required."
           })
        }

        const res = await fetch(`${config.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email , password })
        });

        const data = await res.json();

        if(data.success == false || data.error) {
            return Notification.error({
                title: "Error",
                content: data.error
            })
        }

        localStorage.setItem("token", data.token)
        logStatus.setLoggedIn(true)

        navigate("/apply")
    }

    return (
        <>
        <div className="login-form-main-wrapper">
        <div className="img-container">
            <img src={LoginArt} alt="login art" />
        </div>
        <div className="login-form-container">
            <div className="login-form">
                <h3 className="org-name">MeroShare Pro</h3>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-email" placeholder="Phone number, user or email" />
                <input type="password"value={password} onChange={(e) => setPassword(e.target.value)} className="input-password" placeholder="Password" />
                <button
                onClick={loginHandle}
                type="submit"
                className="submit-btn">Login</button>

                <div className="hr-container">
                    <hr className="or-hr" data-content="OR" />
                </div>

                <button type="submit" className="submit-btn">
                    <i className="bi bi-facebook me-2"></i> 
                    Login with Facebook
                </button>


                <button className="forgot-password">Forgot password?</button>
            </div>
            <div className="signup-div">
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
            </div>
        </div>
        </>
    )
}

export default Login;