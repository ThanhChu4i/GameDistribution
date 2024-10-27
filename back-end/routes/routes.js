const express = require('express');
const { getGames, getGameImage } = require('../controllers/getGames');
const router = express.Router();

// Endpoint để lấy danh sách game
router.get('/games', getGames);

// Endpoint để lấy ảnh của game
router.get('/games/image/:imageName', getGameImage);

module.exports = router;
