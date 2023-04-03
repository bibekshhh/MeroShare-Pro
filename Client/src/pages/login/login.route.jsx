import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginArt from './artt.svg'
import "../css/login.css"
import { Notification, Spin } from "@arco-design/web-react";

import config from "../../config";

const Login = ({logStatus}) => {
    const navigate = useNavigate();

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const loginHandle = async (e) => {
        e.preventDefault();

        setLoading(true)

        if(!email || !password) {
           setLoading(false);

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

        if(data.success === false || data.error) {
            setLoading(false);
            return Notification.error({
                title: "Error",
                content: data.error
            })
        }

        setLoading(false);
        localStorage.setItem("token", data.token)
        logStatus.setLoggedIn(true)

        navigate("/")
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
                className="submit-btn">
                    <Spin delay={500} loading={loading} style={{color: "white", marginRight: 5}}>Login</Spin>
                </button>

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