require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('./controllers/connectdb.js');  // Make sure the database connection is imported
const app = express();
const bodyParser = require('body-parser');
const { User, Game, GameHistory, LikeTab, Review, Genre, GameGenre } = require('./collection/collection.js');
// Import controllers
const { signupUser } = require('./controllers/signupController.js');
const { loginUser } = require('./controllers/loginController.js');
const authenticateAdmin = require('./middleware/authenticateAdmin/authenticateAdmin.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const DevRoutes = require ('./routes/DevRoutes.js');
const routes = require('./routes/routes.js');
// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    credentials: true // Để gửi cookie
}));
app.use(express.json());  // To handle JSON requests
app.use('/api', userRoutes);
// Routes
app.post('/signup', signupUser); // Route for user signup
app.post('/login', loginUser);   // Route for user login
app.get('/admin', authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});
app.use('/storage', express.static('storage')); // Để phục vụ file upload
// Sử dụng routes
app.use('/api',routes);
app.use('/admin',adminRoutes);
app.use('/api',DevRoutes);
app.use('/me', require('./routes/userRoutes.js'));
// Listen on port 8081
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
