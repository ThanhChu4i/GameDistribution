// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {getAdminStats} = require('../controllers/adminController');

// Route để lấy tất cả các số liệu cho admin
router.get('/stats', getAdminStats);

module.exports = router;
