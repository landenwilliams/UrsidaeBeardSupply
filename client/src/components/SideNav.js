import React from 'react';
import '../styles/SideNav.css';
import { FaPinterest, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../functions/firebaseConfig';

const SideNav = ({ setDirection, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="side-nav">
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={() => setDirection(1)} className="auth-link">login</Link>
            <span className="auth-link" style={{marginTop: '20px', marginBottom: '10px'}}>/ </span>
            <Link to="/register" onClick={() => setDirection(1)} className="auth-link">register</Link>
          </>
        ) : (
          <>
            <Link className="auth-link" onClick={handleLogout}>logout</Link>
            <span className="auth-link" style={{marginTop: '20px', marginBottom: '10px'}}>/ </span>
            <Link to="/profile" onClick={() => setDirection(1)} className="auth-link">profile</Link>
          </>
        )}
      </div>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
          <FaTwitter />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="icon">
          <FaPinterest />
        </a>
      </div>
    </div>
  );
};

export default SideNav;
