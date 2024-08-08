const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const {shopifyApp} = require('@shopify/shopify-app-express');
// const { MemorySessionStorage } = require('@shopify/shopify-app-session-storage-memory');

// Initialize dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Check if shopifyApp is defined before calling initialize (debugging)
// console.log("shopifyApp:", shopifyApp);

// Shopify app configuration
const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ['read_products', 'write_products'], // adjust scopes based on your needs
    hostName: process.env.HOST_NAME.replace(/https:\/\//, ''), // remove https:// from HOST_NAME
    isEmbeddedApp: false, // likely not an embedded app
  },
  auth: {
    path: '/auth',
    callbackPath: '/auth/callback',
    myShopifyDomain: 'myshopify.com',
    accessMode: 'offline',
  },
  webhooks: {
    path: '/webhooks',
  },
  // sessionStorage: new MemorySessionStorage(), // Use MemorySessionStorage from the correct package
});

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

// Shopify app routes
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: {} }), // Define your webhook handlers as needed
);

// Basic route for testing
// app.get('/', (req, res) => {
//   res.send('Hello from the server!');
// });



// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
} else {
  // Catch-all handler for development environment
  // app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
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
