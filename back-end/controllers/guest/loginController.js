const jwt = require('jsonwebtoken');
const { User } = require('../../collection/collection'); // Import User model
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Request received: ', { email, password });

    // Check if email and password are provided
    if (!email || !password) {
        console.log('Validation failed: missing email or password');
        return res.status(400).json({ message: "Please fill in all information." });
    }

    try {
        console.log('Finding user with email:', email);

        // Find user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);

        // Check if user exists
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        if (!user.isActive) {
            console.log('Login failed: User account is locked');
            return res.status(401).json({ message: "Account locked" });
        }

        // Verify password
        console.log('Comparing passwords...');
        const match = await bcrypt.compare(password, user.password);
        console.log('Password match result:', match);

        if (!match) {
            console.log('Login failed: Incorrect password');
            return res.status(401).json({ message: "Email or password is incorrect." });
        }

        // Create JWT after successful login
        console.log('Creating JWT...');
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                isAdmin: user.admin,
                isPublisher: user.publisher,
                isDeveloper: user.developer,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        console.log('JWT created:', token);

        // Set avatar to custom or default path
        const avatar = user.avatarPath ? user.avatarPath : '/avatars/avatar_default.webp';
        console.log('Avatar path:', avatar);

        const isAdmin = user.admin;
        const isDevPub = user.developer || user.publisher;

        console.log('Login successful:', { isAdmin, isDevPub });

        // Respond based on user role
        return res.status(200).json({
            message: "Login successful!",
            token,
            isAdmin,
            isDevPub,
            avatar,
        });

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { loginUser };
