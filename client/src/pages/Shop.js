import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCirclePlus } from 'react-icons/fa6';
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
            delay: i * 0.05,
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
            delay: 0.02 + i * 0.2,
            duration: 0.8,
            ease: 'easeOut',
        },
    }),
};

const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

const popUpVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
};

const productItems = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
    { id: 11, name: 'Product 11' },
    { id: 12, name: 'Product 12' },
    { id: 13, name: 'Product 13' },
    { id: 14, name: 'Product 14' },
    { id: 15, name: 'Product 15' },
    { id: 16, name: 'Product 16' },
    { id: 17, name: 'Product 17' },
    { id: 18, name: 'Product 18' },
    { id: 19, name: 'Product 19' },
    { id: 20, name: 'Product 20' },
    { id: 21, name: 'Product 21' },
    { id: 22, name: 'Product 22' },
    { id: 23, name: 'Product 23' },
    { id: 24, name: 'Product 24' },
];

const Shop = ({ setDirection }) => {
    const navigate = useNavigate();
    const shopRef = useRef(null);
    const [view, setView] = useState('links');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addToCartPopUp, setAddToCartPopUp] = useState(false);
    const cardContainerRef = useRef(null);

    const scrollUp = () => { cardContainerRef.current.scrollBy({ top: '-11.458vw', behavior: 'smooth' }); };
    const scrollDown = () => { cardContainerRef.current.scrollBy({ bottom: '11.458vw', behavior: 'smooth' }); };

    const navigateToAbout = () => {
        navigate('/', { state: { scrollTo: 'about' } });
        setDirection(-1);
    };

    useEffect(() => {
        const handlePopState = () => {
            setView('links');
            setSelectedCategory(null);
            setSelectedProduct(null);
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const showItems = (category) => {
        setView('items');
        setSelectedCategory(category);
    };

    const goBack = () => {
        setView('links');
        setSelectedCategory(null);
    };

    const viewProduct = (product) => {
        setView('product');
        setSelectedProduct(product);
    };

    return (
        <div className="main-container">
            <motion.section
                ref={shopRef}
                className="hero"
                style={{ backgroundImage: `url(${shopImage})`, backgroundPosition: 'center top' }}
                initial="hidden"
                animate="visible"
                variants={backgroundVariants}
            >
                <div className="header">
                    <h1 className="title gold">SHOP</h1>
                </div>

                <AnimatePresence mode="wait">
                    {addToCartPopUp && (
                        <motion.div
                            className="add-to-cart-popup"
                            variants={popUpVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                position: 'absolute',
                                zIndex: 5000,
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <motion.div
                                style={{
                                    minWidth: '300px',
                                    minHeight: '500px',
                                    borderRadius: '15px',
                                    border: 'solid 5px white',
                                    backgroundColor: 'black',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                }}
                            >
                                <button onClick={() => setAddToCartPopUp(false)} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}>
                                    ✕
                                </button>
                                <p style={{ color: 'white', textAlign: 'center', marginTop: 'auto', fontSize: '1.5rem' }}>
                                    Added to cart!
                                </p>
                                <button onClick={() => setAddToCartPopUp(false)} style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: '20px', padding: '10px 20px', backgroundColor: '#E0BB20', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem' }}>
                                    Continue Shopping
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                    {view === 'links' ? (
                        <motion.div className="shop-links" key="links" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                            {[
                                'Luxurious Soaps.',
                                'Premium Beard Oils.',
                                'Invigorating Beard Scrubs.',
                                'Exquisite Sugar Scrubs.',
                                'Ultra-Smooth Shave Oils.',
                            ].map((linkText, index) => (
                                <motion.h1
                                    key={linkText}
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                    className="shop-link-container"
                                    onClick={() => showItems(linkText)}
                                >
                                    <motion.div
                                        className="text-reveal-mask"
                                        initial="hidden"
                                        animate="visible"
                                        custom={index}
                                        variants={textRevealVariants}
                                    >
                                        <span className="linkBulletPoint">• </span><span className="shop-link">{linkText}</span>
                                    </motion.div>
                                </motion.h1>
                            ))}
                        </motion.div>
                    ) : view === 'items' ? (
                        <motion.div className="shop-items-wrapper" key="items" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                            <button className="back-button" onClick={goBack}>
                                Back to Categories
                            </button>
                            <h2>{selectedCategory}</h2>
                            <motion.div className="shop-items" ref={cardContainerRef}>
                                <ul className="shop-items-list">
                                    {productItems.map((item) => (
                                        <li className="shopItemWrapper">
                                            <FaCirclePlus className="add-to-cart-icon" onClick={() => setAddToCartPopUp(true)} />
                                            <div className="shopItem" onClick={() => viewProduct(item)} key={item.id}>
                                                {item.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div className="product-view" key="product" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                            <div style={{ display: 'flex' }}>
                                <button className="back-button" onClick={goBack}>
                                    Back to Categories
                                </button>
                                <button className="back-button" onClick={() => setView('items')}>
                                    Back to {selectedCategory}
                                </button>
                            </div>
                            <div className="product-details">
                                <div className="product-image">
                                    <div className="scaled-product">
                                        {selectedProduct.name}
                                    </div>
                                </div>
                                <div className="product-description">
                                    <h2>{selectedProduct.name}</h2>
                                    <p>{selectedProduct.description}</p>
                                    <button className="add-to-cart-button" onClick={() => { setAddToCartPopUp(true) }}>Add to Cart</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="nav-links">
                    <motion.div initial="hidden" animate="visible" custom={0} variants={navLinkVariants}>
                        <Link to="/" onClick={() => setDirection(-1)} className="nav-link">home.</Link>
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" custom={1} variants={navLinkVariants}>
                        <button onClick={navigateToAbout} className="nav-link">about.</button>
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" custom={2} variants={navLinkVariants}>
                        <Link to="/contact" onClick={() => setDirection(1)} className="nav-link">contact.</Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Shop;
