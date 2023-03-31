// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginArt from './artt.svg'
import "../css/login.css"

const Login = ({logStatus}) => {
    const navigate = useNavigate();

    const loginHandle = (e) => {
        e.preventDefault();

        const timer = setTimeout(() => {
            logStatus.setLoggedIn(true)
            navigate('/')
        }, 1000);

        return () => clearTimeout(timer)
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
                <input type="text" className="input-email" placeholder="Phone number, user or email" />
                <input type="password" className="input-password" placeholder="Password" />
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