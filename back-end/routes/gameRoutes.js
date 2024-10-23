// back-end/routes/gameRoutes.js
const express = require('express');
const { uploadGameImage } = require('../controllers/uploadgame');

const router = express.Router();

router.post('/upload', uploadGameImage);
module.exports = router;
