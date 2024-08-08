import React from 'react';
import '../styles/SideNav.css';
import { FaPinterest, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideNav = ({ setDirection }) => {
  return (
    <div className="side-nav">
      <div className="auth-links">
        <Link to="/login" onClick={() => setDirection(1)} className="auth-link" >login / register</Link>
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
}

export default SideNav;

