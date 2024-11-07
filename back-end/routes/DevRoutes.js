const express = require('express');
const {getGamesWithUser, updateGame, deleteGame} =require('../controllers/userSettinggame');
const authenticateDevPub = require('../middleware/authenticateDevPub/authenticateDevPub');
const {getGamesWithUserInfo } = require('../controllers/getGames');
const router = express.Router();

// roure đổi mật khẩu
router.get('/yourgames', authenticateDevPub, getGamesWithUserInfo);
router.get('/mygame',authenticateDevPub, getGamesWithUser);
router.put('/updategame/:id',authenticateDevPub, updateGame);
router.delete('/deletegame/:id',authenticateDevPub, deleteGame)

module.exports = router;
