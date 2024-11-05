// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {getAdminStats} = require('../controllers/adminController');
const {getUser, updateUser, deleteUser, getGames, updateGame, deleteGame} = require('../controllers/adminSetting.js');
const authenlicateToken = require ('../middleware/authenticateToken/authenticateToken.js');
const authenlicateAdmin = require ('../middleware/authenticateAdmin/authenticateAdmin.js');
// Route để lấy tất cả các số liệu cho admin
 router.get('/stats', authenlicateToken, authenlicateAdmin, getAdminStats);
router.get('/settinguser',authenlicateToken, authenlicateAdmin, getUser);
router.put('/settinguser/:id', authenlicateToken, authenlicateAdmin, updateUser);
router.delete('/settinguser/:id', authenlicateToken, authenlicateAdmin, deleteUser);
router.get('/settinggame',authenlicateToken, authenlicateAdmin, getGames);
router.put('/updategame/:id', authenlicateToken, authenlicateAdmin, updateGame);
router.delete('/settinggame/:id', authenlicateToken, authenlicateAdmin, deleteGame);
module.exports = router;
