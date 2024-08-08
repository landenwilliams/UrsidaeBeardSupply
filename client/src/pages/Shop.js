import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import shopImage from '../assets/images/shopNew2.png';
import '../styles/Shop.css';

const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 2 },
    },
};

const navLinkVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2 + i * 0.1,
            duration: 0.5,
        },
    }),
};

const textRevealVariants = {
    hidden: { height: 0, opacity: 0, y: '100%' },
    visible: (i) => ({
        height: '100%',
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3 + i * 0.2,
            duration: 0.8,
            ease: 'easeOut',
        },
    }),
};

const Shop = ({ setDirection }) => {
    const navigate = useNavigate();
    const backgroundControls = useAnimation();
    const shopRef = useRef(null);
    const [view, setView] = useState('links'); // 'links' or 'items'

    const navigateToAbout = () => {
        navigate('/', { state: { scrollTo: 'about' } });
        setDirection(-1);
    };

    useEffect(() => {
        backgroundControls.start("visible");
    }, [backgroundControls]);

    return (
        <div className="main-container">
            <motion.section
                ref={shopRef}
                className="hero"
                style={{ backgroundImage: `url(${shopImage})`, backgroundPosition: 'center top' }}
                initial="hidden"
                animate={backgroundControls}
                variants={backgroundVariants}
            >
                <div className="header">
                    <h1 className="title gold">SHOP</h1>
                </div>
                <div className="shop-links" >
                    {[
                        'Luxurious Soaps.',
                        'Premium Beard Oils.',
                        'Invigorating Beard Scrubs.',
                        'Exquisite Sugar Scrubs.',
                        'Ultra-Smooth Shave Oils.'
                    ].map((linkText, index) => (<motion.h1
                        key={linkText}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        className="shop-link-container"
                    >
                        <motion.div
                            className="text-reveal-mask"
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            variants={textRevealVariants}
                        >
                            • <span className="shop-link">{linkText}</span>
                        </motion.div>
                    </motion.h1>
                    ))}
                </div>

                <div className="nav-links">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={navLinkVariants}
                    >
                        <Link to='/' onClick={() => setDirection(-1)} className="nav-link">home.</Link>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={navLinkVariants}
                    >
                        <button onClick={navigateToAbout} className="nav-link">about.</button>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={navLinkVariants}
                    >
                        <Link to='/contact' onClick={() => setDirection(1)} className="nav-link">contact.</Link>
                    </motion.div>
                </div>
            </motion.section>
        </div >
    );
};

export default Shop;
