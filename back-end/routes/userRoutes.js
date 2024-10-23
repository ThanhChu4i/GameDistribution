const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

//router.use(auth);
// Route lấy danh sách người dùng
router.get('/', auth, userController.getUsers);

// Route cập nhật thông tin người dùng
router.put('/', auth, userController.updateUser);

// Route xóa người dùng
router.delete('/', auth, userController.deleteUser);
// roure đổi mật khẩu
router.post('/change-password', auth, userController.changePassword);
module.exports = router;
