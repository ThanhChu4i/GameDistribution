// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {getAdminStats} = require('../controllers/adminController');
const {getUser, updateUser, deleteUser} = require('../controllers/adminSetting.js');
const authenlicateToken = require ('../middleware/authenticateToken/authenticateToken.js');
const authenlicateAdmin = require ('../middleware/authenticateAdmin/authenticateAdmin.js');
// Route để lấy tất cả các số liệu cho admin
 router.get('/stats', authenlicateToken, authenlicateAdmin, getAdminStats);
router.get('/setting',authenlicateToken, authenlicateAdmin, getUser);
router.put('/setting/:id', authenlicateToken, authenlicateAdmin, updateUser);
router.delete('/setting/:id', authenlicateToken, authenlicateAdmin, deleteUser);

module.exports = router;
