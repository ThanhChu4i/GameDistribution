require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('./controllers/connectdb.js');  // Make sure the database connection is imported
const app = express();
const bodyParser = require('body-parser');
const { User, Game, GameHistory, LikeTab, Review, Genre, GameGenre } = require('./collection/collection.js');
const gameRoutes = require('./routes/gameRoutes.js');
// Import controllers
const { signupUser } = require('./controllers/signupController.js');
const { loginUser } = require('./controllers/loginController.js');
const routes = require('./routes/routes.js');
const { getGamesByTab } = require('./controllers/getGameTab.js'); 
const authenticateAdmin = require('./middleware/authenticateAdmin/authenticateAdmin.js');
const authenticateToken = require('./middleware/authenticateToken/authenticateToken.js');
const userRoutes = require('./routes/userRoutes.js');
<<<<<<< HEAD
=======
const adminRoutes = require('./routes/adminRoutes.js');
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318

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
app.get('/admin', authenticateToken, authenticateAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin panel!', user: req.user });
});
app.use('/storage', express.static('storage')); // Để phục vụ file upload
// Sử dụng routes
app.use('/api/games',gameRoutes);
app.use('/api',routes);
<<<<<<< HEAD
=======
app.use('/admin',adminRoutes);
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
app.get('/games/tab/:tabNumber', async (req, res) => {
    const tabNumber = parseInt(req.params.tabNumber);

    try {
        const games = await getGamesByTab(tabNumber);
        if (games.length === 0) {
            return res.status(404).json({ message: 'No games found for this tab.' });
        }
        res.json(games);
    } catch (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Failed to fetch games' });
    }
});


app.use('/me', require('./routes/userRoutes.js'));
// Listen on port 8081
app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
