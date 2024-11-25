const path = require('path');
const fs = require('fs');

// Controller to fetch user avatar
const getUserAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Assuming you're getting the user from the session or token

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const avatarPath = path.resolve(__dirname, 'public', user.avatarPath); // Get the full path to the avatar

        if (!fs.existsSync(avatarPath)) {
            return res.status(404).json({ error: 'Avatar not found.' });
        }

        // Send the image file to the client
        res.sendFile(avatarPath);
    } catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the avatar.' });
    }
};

module.exports = {
    getUserAvatar,
};
