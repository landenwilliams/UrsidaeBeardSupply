import React, { useEffect } from 'react';
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const CartIcon = ({ setDirection }) => {

    return (
        <div
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
                border: '5px solid white',
                padding: 10,
                animation: 'none', // Ensure no animations are applied
                transition: 'none' // Ensure no transitions are applied
            }}
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
                    color: 'white',
                    width: 50,
                    height: 50,
                    fontSize: 40,
                    animation: 'none', // Ensure no animations are applied
                    transition: 'none' // Ensure no transitions are applied
                }}
            >
                <BsCart3 />
            </Link>
        </div>
    );
};

export default CartIcon;
