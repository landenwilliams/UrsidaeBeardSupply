import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ setDirection }) => {
    const navigate = useNavigate();
    const items = [
        { id: 1, name: 'Product 1', price: 29.99, quantity: 2, image: 'url-to-image1' },
        { id: 2, name: 'Product 2', price: 19.99, quantity: 1, image: 'url-to-image2' }
    ];

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleClose = () => {
        navigate(-1); // Navigate back to the previous page
        setDirection(0);
    };

    return (
        <motion.div
            className="cart-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
        >
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>${item.price.toFixed(2)}</p>
                                <div className="cart-item-actions">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        readOnly
                                    />
                                    <button>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-total">
                <h3>Total: ${calculateTotal()}</h3>
            </div>
            <div className="cart-summary">
                <button className="cancel-button" onClick={handleClose}>Cancel</button>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </motion.div>
    );
};

export default Cart;
