import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing CSS file for global styles
import App from './App'; // Importing the App component

// Creating the root element and rendering the App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Select the root div element in HTML
root.render(
    <React.StrictMode>
        <App /> {/* Render the App component */}
    </React.StrictMode>
);
