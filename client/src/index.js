import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './style.css';

const container = document.getElementById('root'); // Get the container to mount your app
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <Router> {/* Wrap the App component in Router */}
      <App />
    </Router>
  </React.StrictMode>
);
