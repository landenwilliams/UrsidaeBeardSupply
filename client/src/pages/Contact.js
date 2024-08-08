import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import contactImage from '../assets/images/contactNew.png';
import '../styles/Contact.css';

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
            duration: 0.5
        }
    })
};

const Contact = ({ setDirection }) => {
    const navigate = useNavigate();
    const backgroundControls = useAnimation();
    const contactRef = useRef(null);

    const navigateToAbout = () => {

        navigate('/', { state: { scrollTo: 'about' } });
        setDirection(-1);
    };

    useEffect(() => {
        backgroundControls.start("visible"); // Start background animation when component mounts
    }, [backgroundControls]); // Add backgroundControls to dependency array


    return (
        <div className="main-container">
            <motion.section
                ref={contactRef}
                className="hero"
                initial="hidden"
                style={{ backgroundImage: `url(${contactImage})`, backgroundPosition: 'top center' }}
                animate={backgroundControls} // Use backgroundControls for animation
                variants={backgroundVariants}
            >
                <div className="header">
                    <h1 className="title white">CONTACT</h1>
                </div>
                <div className="contact-content">
                    <p>We'd love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to give us feedback, our team is here to help.</p>

                    <div class="contact-info">
                        <p><strong>Email:</strong> <a href="mailto:support@ourstore.com">support@ourstore.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:1-800-123-4567">1-800-123-4567</a></p>
                        <p><strong>Live Chat:</strong> Available 24/7 on our website (Click the chat icon in the bottom right corner)</p>
                    </div>

                    <p>If you prefer to reach us by mail, you can send your correspondence to:</p>
                    <p>[Your Company Name]<br/>
                        123 E-commerce St.<br/>
                            Suite 456<br/>
                                City, State, ZIP Code</p>

                            <p>For quick answers to common questions, visit our <a href="#">FAQ page</a>.</p>

                            <p>We value your feedback and suggestions. Please fill out our <a href="#">feedback form</a> to let us know how we can improve your shopping experience.</p>

                            <p>Thank you for choosing our store. We look forward to assisting you!</p>

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
                                <Link to='/shop' onClick={() => setDirection(-1)} className="nav-link">shop.</Link>
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
                )
}

                export default Contact;