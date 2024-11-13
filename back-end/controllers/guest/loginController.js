const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../../collection/collection'); // Import User model
const bcrypt = require("bcrypt");
const path = require("path"); // Import path for handling file paths

// Handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all information." });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: "Account locked" });
        }

        // Verify password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        // Create JWT after successful login
        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.admin, isPublisher: user.publisher, isDeveloper: user.developer },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Set avatar to custom or default path
        const avatar = user.avatarPath ? user.avatarPath : '/avatars/avatar_default.webp';
        const isAdmin = user.admin;
        const isDevPub = user.developer || user.publisher;

        // Respond based on user role
        return res.status(200).json({
            message: "Login successful!",
            token,
            isAdmin,
            isDevPub,
            avatar
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { loginUser };
