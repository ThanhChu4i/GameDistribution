require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path'); // Import the path module here
const db = require('./config/connectdb.js');  // Ensure database connection is properly configured
const app = express();

// Import controllers
const authenticateAdmin = require('./middleware/authenticateAdmin/authenticateAdmin.js');
const allRoutes = require('./routes/allRoutes.js');

// Middleware
app.use(cors({
    origin: [`https://fe4.backendintern.online`, `https://45.77.32.24:3000`,`http://fe4.backendintern.online`, `http://45.77.32.24:3000`,`http://locahost:3000`], // Frontend URL
    credentials: true, // Enable sending cookies,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.get('/admin', authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});
app.use('/avatars', express.static(path.resolve(__dirname, 'public', 'avatars'))); // Serve avatar images from 'public/avatars'
app.use('/images', express.static(path.resolve(__dirname, 'public', 'images'))); 
app.use('/games', express.static(path.resolve(__dirname, 'public', 'games'))); 
// All other routes
app.use('/', allRoutes);

// Start the server
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
