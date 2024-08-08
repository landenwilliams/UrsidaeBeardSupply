import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const shopItemsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const ShopItems = () => {

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={shopItemsVariants}
            className="shop-items-container"
        >
            <div className="header">

                <h1 className="title gold">SHOP ITEMS</h1>

            </div>
            <div className="shopItems">
                <div className="shopItem"></div>
                <div className="shopItem"></div>
                <div className="shopItem"></div>
                <div className="shopItem"></div>
            </div>
        </motion.div>
    );
};

export default ShopItems;
