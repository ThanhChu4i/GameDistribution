const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes.js');
const dev_pubRoutes = require('./dev_pubRoutes.js');
const guestRoutes = require('./guestRoutes.js');
const userRoutes = require('./userRoutes.js');
const servicesRoutes = require('./servicesRoute.js');

router.use('/api',guestRoutes);
router.use('/user', userRoutes);
router.use('/admin',adminRoutes);
router.use('/dev',dev_pubRoutes);
router.use('/service',servicesRoutes);

module.exports = router