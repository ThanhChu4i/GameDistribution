const express = require('express');
const {getGameImage, getGames, getGamesWithUserInfo } = require('../controllers/getGames');
const router = express.Router();
const auth =require('../middleware/auth');
const { getGameById } = require('../controllers/getGameById');
// Endpoint để lấy danh sách game
router.get('/games', getGames);
// Endpoint để lấy ảnh của game
//router.get('/games/image/:imageName', getGameImage);
router.get('/yourgames', auth, getGamesWithUserInfo);
router.get('/games/:id', getGameById);
module.exports = router;
