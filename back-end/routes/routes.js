const express = require('express');
const {getGameImage, getGamesWithUserInfo } = require('../controllers/getGames');
const router = express.Router();

// Endpoint để lấy danh sách game
router.get('/games', getGamesWithUserInfo);

// Endpoint để lấy ảnh của game
router.get('/games/image/:imageName', getGameImage);

module.exports = router;
