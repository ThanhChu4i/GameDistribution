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
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true // Enable sending cookies
}));
app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.get('/admin', authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});

app.use('/storage', express.static('storage')); // Serve files from 'storage' directory
app.use('/avatars', express.static(path.resolve(__dirname, 'public', 'avatars'))); // Serve avatar images from 'public/avatars'

// All other routes
app.use('/', allRoutes);

// Start the server
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
