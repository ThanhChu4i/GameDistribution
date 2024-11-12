require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require('./controllers/connectdb.js');  // Make sure the database connection is imported
const app = express();
// Import controllers
const authenticateAdmin = require('./middleware/authenticateAdmin/authenticateAdmin.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const devRoutes = require ('./routes/devRoutes.js');
const guestRoutes = require('./routes/guestRoutes.js');
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    credentials: true // Để gửi cookie
}));
app.use(express.json());  // To handle JSON requests
app.use('/user', userRoutes);
// Routes  
app.get('/admin', authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});
app.use('/storage', express.static('storage')); // Để phục vụ file upload
// Sử dụng routes
app.use('/api',guestRoutes);
app.use('/admin',adminRoutes);
app.use('/dev',devRoutes);
// Listen on port 8081
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
