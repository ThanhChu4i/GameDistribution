const express = require('express');
const { getGames} = require('../controllers/getGames');
const {searchGames} = require('../controllers/search');
const router = express.Router();
const { getGameById } = require('../controllers/getGameById');
const {getGamesByTab} = require ('../controllers/getGameTab');
// Endpoint để lấy danh sách game
router.get('/games', getGames);
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
