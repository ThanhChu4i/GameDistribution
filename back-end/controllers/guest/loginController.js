// loginController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../../collection/collection'); // Import model User
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

        if (!user.isActive) {
            return res.status(401).json({ message: "Account locked" });
        }

        // Kiểm tra mật khẩu
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        // Tạo JWT sau khi đăng nhập thành công
        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.admin, isPublisher: user.publisher, isDeveloper: user.developer },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Phân loại người dùng theo quyền hạn
        let isAdmin = user.admin;
        let isDevPub = user.developer || user.publisher;

        // Trả về phản hồi tùy theo quyền hạn
        return res.status(200).json({
            message: "Login successful!",
            token,
            isAdmin,
            isDevPub
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { loginUser };
