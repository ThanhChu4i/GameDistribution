// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {getAdminStats} = require('../controllers/adminController');
const {getUser, updateUser, deleteUser, getGames, updateGame, deleteGame} = require('../controllers/adminSetting.js');
const authenlicateAdmin = require ('../middleware/authenticateAdmin/authenticateAdmin.js');
// Route để lấy tất cả các số liệu cho admin
 router.get('/stats', authenlicateAdmin, getAdminStats);
router.get('/settinguser', authenlicateAdmin, getUser);
router.put('/settinguser/:id', authenlicateAdmin, updateUser);
router.delete('/settinguser/:id', authenlicateAdmin, deleteUser);
router.get('/settinggame',authenlicateAdmin, getGames);
router.put('/updategame/:id', authenlicateAdmin, updateGame);
router.delete('/settinggame/:id', authenlicateAdmin, deleteGame);
module.exports = router;
