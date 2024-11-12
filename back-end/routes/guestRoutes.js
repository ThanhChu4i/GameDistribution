const express = require('express');
const { getGames} = require('../controllers/guest/getGames');
const {searchGames} = require('../controllers/guest/search');
const router = express.Router();
const { getGameById } = require('../controllers/guest/getGameById');
const {getGamesByTab} = require ('../controllers/guest/getGameTab');
const {loginUser} = require ('../controllers/guest/loginController');
const {signupUser} = require ('../controllers/guest/signupController');
// Endpoint để lấy danh sách  game
router.get('/games', getGames);
router.post('/signup', signupUser); // Route for user signup
router.post('/login', loginUser);
router.get('/games/:id', getGameById);
router.get('/search-games', searchGames);
router.get('/games/tab/:tabNumber', async (req, res) => {
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
module.exports = router;
