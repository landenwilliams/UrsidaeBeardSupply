import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { auth } from '../functions/firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = ({ setDirection, setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
        setDirection(-1);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="social-login">
                <button className="google-login" onClick={handleGoogleLogin}>
                    <FaGoogle /> Login with Google
                </button>
                <button className="facebook-login" onClick={handleFacebookLogin}>
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
