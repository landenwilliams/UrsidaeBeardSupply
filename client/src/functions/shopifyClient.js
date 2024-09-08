// src/shopifyClient.js
import Client from 'shopify-buy';
import dotenv from 'dotenv';

dotenv.config();
console.log("Token: ", process.env.SHOPIFY_API_TOKEN)

const client = Client.buildClient({
  domain: 'ursidaebeardshop.myshopify.com ', 
  storefrontAccessToken: process.env.SHOPIFY_API_TOKEN, 
});

export default client;
