// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {getAdminStats} = require('../controllers/adminController');

// Route để lấy tất cả các số liệu cho admin
router.get('/stats', getAdminStats);
// Route xóa người dùng
router.delete('/', auth, userController.deleteUser);

module.exports = router;
