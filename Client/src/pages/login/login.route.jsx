import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginArt from './artt.svg'
import "../css/login.css"
import { Notification, Spin } from "@arco-design/web-react";

import API_URL from '../../config';

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

        // Create a new AbortController instance
        const abortController = new AbortController();

        // Set a timeout to abort the fetch request after 10 seconds
        setTimeout(() => {
            abortController.abort();
        }, 10000);

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
              signal: abortController.signal, // Set the signal option to the AbortController's signal
            });
        
            const data = await res.json();
        
            if (data.success === false || data.error) {
              setLoading(false);
              return Notification.error({
                title: "Error",
                content: data.error,
              });
            }
        
            setLoading(true);
            localStorage.setItem("token", data.token);
            logStatus.setLoggedIn(true);
        
            navigate("/");
        } catch (err) {
            if (err.name === "AbortError") {
                // Handle the abort error
                setLoading(false);
                return Notification.error({
                    title: "Error",
                    content: "The request took too long to complete.",
                });
            }
        }
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
            
                <Spin delay={500} loading={loading} style={{width: '100%', color: "white", marginRight: 5}}>
                <button
                style={{width: '100%'}}
                onClick={(e) => loginHandle(e)}
                type="submit"
                className="submit-btn">
                    Login
                </button>
                </Spin>
                    

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