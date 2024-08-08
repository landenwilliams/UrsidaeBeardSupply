import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import About from './About.js';
import homeImage from '../assets/images/homeNew.png';

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
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const Home = ({ setDirection }) => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const location = useLocation();
  const navLinkControls = useAnimation();
  const backgroundControls = useAnimation();

  const handleScrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollLogic = () => {
      if (location.state?.scrollTo === 'about') {
        handleScrollToAbout();
      } else if (location.state?.scrollTo === 'home') {
        const timer = setTimeout(() => {
          homeRef.current.scrollIntoView({ behavior: 'smooth' });
          homeObserver.disconnect();
          homeObserver.observe(homeRef.current);
        }, 100); // Adjust delay as needed

        return () => clearTimeout(timer); // Cleanup the timer on unmount
      }
    };

    const homeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navLinkControls.start((i) => 'visible');
          backgroundControls.start((i)=> 'visible');
        } else {
          navLinkControls.start((i) => 'hidden');
          backgroundControls.start((i)=> 'hidden');
        }
      },
      { threshold: 0.6 }
    );

    const homeObserverExit = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            backgroundControls.start((i)=> 'hidden');
          } else {
            backgroundControls.start((i)=> 'visible');
          }
        },
        { threshold: 0.2 }
      );

    handleScrollLogic();
    homeObserver.observe(homeRef.current);
    homeObserverExit.observe(aboutRef.current);

    return () => {
      homeObserver.disconnect();
    };
  }, [navLinkControls, location.state, homeRef]);

  return (
    <div className="main-container">
      <motion.section
        ref={homeRef}
        className="hero"
        style={{ backgroundImage: `url(${homeImage})`, backgroundPosition: 'center top' }}
        initial="hidden"
        animate={backgroundControls}
        variants={backgroundVariants}
      >
        <div className="header">
          <h1 className="title gold">URSIDAE</h1>
          <h1 className="title white">
            BEARD<br />SUPPLY
          </h1>
        </div>
        <div className="nav-links">
          <motion.button
            initial="hidden"
            animate={navLinkControls}
            custom={0}
            variants={navLinkVariants}
            onClick={handleScrollToAbout}
            className="nav-link"
          >
            about.
          </motion.button>
          <motion.div
            initial="hidden"
            animate={navLinkControls}
            custom={1}
            variants={navLinkVariants}
          >
            <Link
              to="/shop"
              onClick={() => {
                setDirection(1);
              }}
              className="nav-link"
            >
              shop.
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={navLinkControls}
            custom={2}
            variants={navLinkVariants}
          >
            <Link
              to="/contact"
              onClick={() => {
                setDirection(1);
              }}
              className="nav-link"
            >
              contact.
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <About ref={aboutRef} homeRef={homeRef} setDirection={setDirection} />
    </div>
  );
};

export default Home;
