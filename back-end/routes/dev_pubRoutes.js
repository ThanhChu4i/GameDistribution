const express = require('express');
const {getGamesWithUser, updateGame, deleteGame} =require('../controllers/developer_publisher/userSettinggame');
const authenticateDevPub = require('../middleware/authenticateDevPub/authenticateDevPub');
const {getGamesWithUserInfo } = require('../controllers/developer_publisher/getGameWithUserInfo');
const { uploadGameforDev, uploadGameforPub } = require('../controllers/developer_publisher/uploadgame');
const router = express.Router();

// roure đổi mật khẩu
router.get('/yourgames', authenticateDevPub, getGamesWithUserInfo);
router.get('/mygame',authenticateDevPub, getGamesWithUser);
router.put('/updategame/:id',authenticateDevPub, updateGame);
router.delete('/deletegame/:id',authenticateDevPub, deleteGame);
router.post('/games/upload-dev', authenticateDevPub, uploadGameforDev);
router.post('/games/upload-pub', authenticateDevPub, uploadGameforPub);
module.exports = router;