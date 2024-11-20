require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require('./config/connectdb.js');  // Make sure the database connection is imported
const app = express();
// Import controllers
const authenticateAdmin = require('./middleware/authenticateAdmin/authenticateAdmin.js');
const allRoutes = require ('./routes/allRoutes.js');
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    credentials: true // Để gửi cookie
}));
app.use(express.json());  // To handle JSON requests

// Routes  
app.get('/admin', authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});
app.use('/storage', express.static('storage')); // Để phục vụ file upload

 app.use('/', allRoutes);
// Listen on port 8081
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
