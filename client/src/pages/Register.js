import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = ({setDirection}) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
        setDirection(-1);

    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Register;
