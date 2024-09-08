import React from 'react';
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

const CartIcon = ({ setDirection }) => {

    return (
        <motion.div
            className="cart-icon"
            style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 47,
                right: 47,
                zIndex: 1000,
                borderRadius: 50,
                border: '5px solid white', // Default border color
                padding: 10,
                color: 'white', // Default icon color
                cursor: 'pointer'
            }}
            whileHover={{ 
                scale: 1.2, // Scale up the container
                borderColor: '#E0BB20', // Change border color on hover
                color: '#E0BB20', // Change icon color on hover
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }} // Bouncy animation
        >
            <Link
                to="/cart"
                onClick={() => {
                    setDirection(1);
                }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    fontSize: 40,
                    color: 'inherit', // Inherit color from the container
                }}
            >
                <BsCart3 style={{ color: 'inherit' }} /> {/* Inherit color from parent */}
            </Link>
        </motion.div>
    );
};

export default CartIcon;
