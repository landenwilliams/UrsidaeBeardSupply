// server/controllers/shopifyController.js
const axios = require('axios');

const getProductList = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.shopify.com/v1/products', {
      headers: { Authorization: `Bearer ${process.env.SHOPIFY_API_TOKEN}` }
    });
    res.json(data.products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getProductList
};
