const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes.js');
const devRoutes = require('./devRoutes.js');
const guestRoutes = require('./guestRoutes.js');
const userRoutes = require('./userRoutes.js');
const servicesRoutes = require('./servicesRoute.js');

router.use('/api',guestRoutes);
router.use('/user', userRoutes);
router.use('/admin',adminRoutes);
router.use('/dev',devRoutes);
router.use('/service',servicesRoutes);

module.exports = router