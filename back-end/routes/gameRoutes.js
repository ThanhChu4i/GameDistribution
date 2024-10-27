const express = require('express');
const { uploadGameImage } = require('../controllers/uploadgame');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/upload', auth, uploadGameImage);

module.exports = router;
