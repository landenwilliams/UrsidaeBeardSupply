// Import necessary modules
import '@shopify/shopify-api/adapters/node';
import { Shopify, LATEST_API_VERSION } from '@shopify/shopify-api';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Import the Shopify Express package and extract the shopifyApp function
import shopifyExpress from '@shopify/shopify-app-express';
const { shopifyApp } = shopifyExpress;

// Initialize dotenv
dotenv.config();
console.log("HOST_NAME:", process.env.HOST_NAME);

// Initialize Shopify API Context
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: ['read_products', 'write_products'],
  HOST_NAME: process.env.HOST_NAME.replace(/^https?:\/\//, ''), // Remove protocol
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.October22, // Adjust based on the API version you need
  SESSION_STORAGE: new CustomSessionStorage(), // or another storage mechanism
});

// Custom session storage implementation
class CustomSessionStorage {
  constructor() {
    this.sessions = {};
  }

  async storeSession(session) {
    this.sessions[session.id] = session;
    return true;
  }

  async loadSession(id) {
    return this.sessions[id] || null;
  }

  async deleteSession(id) {
    delete this.sessions[id];
    return true;
  }
}

const app = express();
const PORT = process.env.PORT || 5001;

// Security Enhancements
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8080', // Adjust this to match the client URL
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());

// Shopify Authentication Middleware
app.use(shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  secret: process.env.SHOPIFY_API_SECRET,
  scopes: ['read_products', 'write_products'],
  // host: process.env.HOST_NAME,  // Ensure this is set with your ngrok URL
  afterAuth(req, res) {
    const { session } = req;
    console.log('Successfully authenticated with session:', session.id);
    res.redirect('/');
  }
}));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
