import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import '../styles/About.css';

const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1 },
    },
};

const navLinkVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 + i * 0.1,
            duration: 0.5,
        },
    }),
};

const About = React.forwardRef(({ homeRef, setDirection }, ref) => {
    const navLinkControls = useAnimation();
    const backgroundControls = useAnimation();
    const navigate = useNavigate();

    useEffect(() => {
        const aboutObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    navLinkControls.start((i) => 'visible');
                    backgroundControls.start((i) => 'visible');
                } else {
                    navLinkControls.start((i) => 'hidden');
                    backgroundControls.start((i) => 'hidden');
                }
            },
            { threshold: 0.5 }
        );

        aboutObserver.observe(ref.current);

        return () => {
            aboutObserver.disconnect();
        };
    }, [navLinkControls, ref]); // Ensure 'ref' is in the dependency array

    const handleScrollToHome = () => {
        homeRef.current.scrollIntoView({ behavior: 'smooth' });
        navigate('/', { state: { scrollTo: 'home' } });
    };

    return (
        <motion.section ref={ref} id="aboutsection" className="hero" initial="hidden" animate={backgroundControls} variants={backgroundVariants}>
            <div className="header">
                <h1 className="title white">ABOUT</h1>
            </div>
            <div className="about-content">
                <div className="image-placeholder">
                    <p>Image Placeholder</p>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                <div className="text-container">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                    <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                </div>
            </div>
            <div className="nav-links">
                <motion.button
                    initial="hidden"
                    animate={navLinkControls}
                    custom={0}
                    variants={navLinkVariants}
                    onClick={handleScrollToHome}
                    className="nav-link"
                >
                    home.
                </motion.button>
                <motion.div
                    initial="hidden"
                    animate={navLinkControls}
                    custom={1}
                    variants={navLinkVariants}
                >
                    <Link to='/shop' onClick={() => { setDirection(1) }} className="nav-link">shop.</Link>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate={navLinkControls}
                    custom={2}
                    variants={navLinkVariants}
                >
                    <Link to='/contact' onClick={() => { setDirection(1) }} className="nav-link">contact.</Link>
                </motion.div>
            </div>
        </motion.section>
    );
});

export default About;
