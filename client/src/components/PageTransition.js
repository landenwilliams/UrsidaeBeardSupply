import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: (direction) => ({
    x: direction === 0 ? 0 : direction > 0 ? '100%' : '-100%',
    opacity: direction === 0 ? 0 : 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

const PageTransition = ({ children, direction }) => {
  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ position: 'absolute', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

