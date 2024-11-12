const express = require('express');
const {getGamesWithUser, updateGame, deleteGame} =require('../controllers/developer/userSettinggame');
const authenticateDevPub = require('../middleware/authenticateDevPub/authenticateDevPub');
const {getGamesWithUserInfo } = require('../controllers/developer/getGameWithUserInfo');
const { uploadGameImage } = require('../controllers/developer/uploadgame');
const router = express.Router();

// roure đổi mật khẩu
router.get('/yourgames', authenticateDevPub, getGamesWithUserInfo);
router.get('/mygame',authenticateDevPub, getGamesWithUser);
router.put('/updategame/:id',authenticateDevPub, updateGame);
router.delete('/deletegame/:id',authenticateDevPub, deleteGame);
router.post('/games/upload', authenticateDevPub, uploadGameImage);

module.exports = router;
