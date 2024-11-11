const express = require('express');
const userController = require('../controllers/userController');
const {gameHistory} = require ('../controllers/gameHistory');
const {getRecentGameHistory} = require ('../controllers/yourHistory');
const auth = require('../middleware/authenticateUser/auth');
const {getOldComment, newComment} = require('../controllers/comment');
const {getLikeStatus, toggleLike} = require("../controllers/likeController");
const router = express.Router();

//router.use(auth);
// Route lấy danh sách người dùng
router.get('/', auth, userController.getUsers);
// Route cập nhật thông tin người dùng
router.put('/', auth, userController.updateUser);
// roure đổi mật khẩu
router.post('/change-password', auth, userController.changePassword);
router.post('/gameHistory',auth, gameHistory);
router.get('/gameHistory/History', auth, getRecentGameHistory);
router.get('/comment/:gameId', getOldComment);
router.post('/comment', auth , newComment);
router.get('/likeStatus', auth, getLikeStatus);
router.post('/toggleLike', auth, toggleLike);
module.exports = router;
