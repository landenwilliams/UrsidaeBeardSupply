import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = ({setDirection}) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
        setDirection(-1);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="social-login">
                <button className="google-login">
                    <FaGoogle /> Login with Google
                </button>
                <button className="facebook-login">
                    <FaFacebook /> Login with Facebook
                </button>
            </div>
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Login;
