// server/routes/shopifyRoutes.js
const express = require('express');
const router = express.Router();
const { getProductList } = require('../controllers/shopifyController');

router.get('/products', getProductList);

module.exports = router;
