const express = require('express');
const { getGames, getGamesWithUserInfo } = require('../controllers/getGames');
const {searchGames} = require('../controllers/search');
const router = express.Router();
const auth =require('../middleware/auth');
const { getGameById } = require('../controllers/getGameById');
// Endpoint để lấy danh sách game
router.get('/games', getGames);
router.get('/yourgames', auth, getGamesWithUserInfo);
router.get('/games/:id', getGameById);
router.get('/search-games', searchGames);

module.exports = router;
