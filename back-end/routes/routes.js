const express = require('express');
const {getGameImage, getGames, getGamesWithUserInfo } = require('../controllers/getGames');
<<<<<<< HEAD
=======
const {searchGames} = require('../controllers/search');
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
const router = express.Router();
const auth =require('../middleware/auth');
const { getGameById } = require('../controllers/getGameById');
// Endpoint để lấy danh sách game
router.get('/games', getGames);
<<<<<<< HEAD
// Endpoint để lấy ảnh của game
//router.get('/games/image/:imageName', getGameImage);
router.get('/yourgames', auth, getGamesWithUserInfo);
router.get('/games/:id', getGameById);
=======
router.get('/yourgames', auth, getGamesWithUserInfo);
router.get('/games/:id', getGameById);
router.get('/search-games', searchGames);
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
module.exports = router;
