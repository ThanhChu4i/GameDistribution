const path = require('path');
const fs = require('fs');

// Controller to fetch user avatar
const getGameImages = async (req, res) => {
    try {
        const game = await Games.findById(req.user._id); // Assuming you're getting the user from the session or token

        if (!game) {
            return res.status(404).json({ error: 'game not found.' });
        }

        const imagePath = path.resolve(__dirname, 'public', game.imagePath); // Get the full path to the avatar

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: 'Avatar not found.' });
        }

        // Send the image file to the client
        res.sendFile(imagePath);
    } catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the avatar.' });
    }
};

module.exports = {
    getGameImages,
};
