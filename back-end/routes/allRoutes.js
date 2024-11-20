const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes.js');
const devRoutes = require('./devRoutes.js');
const guestRoutes = require('./guestRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/api',guestRoutes);
router.use('/user', userRoutes);
router.use('/admin',adminRoutes);
router.use('/dev',devRoutes);

module.exports = router