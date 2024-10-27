//loginController.js
const jwt = require('jsonwebtoken');
const { User } = require('../collection/collection'); // Import model User
const bcrypt = require("bcrypt");

// Xử lý đăng nhập người dùng
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra xem email và password có được cung cấp không
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all information." });
    }

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ email });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        // Kiểm tra mật khẩu
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        // Tạo JWT sau khi đăng nhập thành công
        const token = jwt.sign(
            { _id: user._id , email: user.email, isAdmin: user.admin},
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        // Kiểm tra quyền admin
        if (user.admin) {
            return res.status(200).json({
                message: "Login successful! Redirect to admin page.",
                isAdmin: true,
                token,
                _id: user._id
            });
        } else {
            return res.status(200).json({
                message: "Login successful! Redirect to user page.",
                isAdmin: false,
                token,
                _id: user._id
            });
        }

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { loginUser };
