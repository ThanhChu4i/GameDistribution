const express = require('express');
const { getGames} = require('../controllers/getGames');
const {searchGames} = require('../controllers/search');
const router = express.Router();
const { getGameById } = require('../controllers/getGameById');
// Endpoint để lấy danh sách game
router.get('/games', getGames);
router.get('/games/:id', getGameById);
router.get('/search-games', searchGames);

module.exports = router;
