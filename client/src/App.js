import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchBar from './components/SearchBar';
import SideNav from './components/SideNav';
import PageTransition from './components/PageTransition';
import LoadSpinner from './components/LoadSpinner';
import CartIcon from './components/CartIcon';
import Cart from './components/Cart';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './functions/firebaseConfig';
import './styles/App.css';

const App = () => {
  const location = useLocation();
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  document.body.classList.add('no-scrollbar');

  useEffect(() => {
    const minimumLoaderTime = 1000;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minimumLoaderTime - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      } else {
        setLoading(false);
      }
    };

    window.addEventListener('load', handleLoad);

    if (document.readyState === 'complete') {
      handleLoad();
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDelayedLoading(false);
      }, 600);
    }
  }, [loading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loaderVariants = {
    hidden: { scale: 1.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { scale: 1.5, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }
  };

  return (
    <div className="app-container">
      <AnimatePresence onExitComplete={() => { }}>
        {loading ? (
          <motion.div
            key="loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              display: 'flex',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              zIndex: 2000
            }}
          >
            <LoadSpinner />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!delayedLoading && (
        <div className="content">
          <SearchBar setDirection={setDirection} />
          <SideNav setDirection={setDirection} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <CartIcon setDirection={setDirection} />
          <AnimatePresence initial={true} custom={direction}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={<PageTransition direction={direction}><Home setDirection={setDirection} /></PageTransition>}
              />
              <Route
                path="/shop"
                element={<PageTransition direction={direction}><Shop setDirection={setDirection} /></PageTransition>}
              />
              <Route
                path="/contact"
                element={<PageTransition direction={direction}><Contact setDirection={setDirection} /></PageTransition>}
              />
              <Route
                path="/login"
                element={<PageTransition direction={direction}><Login setDirection={setDirection} setIsLoggedIn={setIsLoggedIn} /></PageTransition>}
              />
              <Route
                path="/register"
                element={<PageTransition direction={direction}><Register setDirection={setDirection} setIsLoggedIn={setIsLoggedIn} /></PageTransition>}
              />
              <Route
                path="/cart"
                element={<PageTransition direction={direction}><Cart setDirection={setDirection} /></PageTransition>}
              />
            </Routes>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default App;
