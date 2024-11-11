const { LikeTab } = require('../collection/collection');
const mongoose = require('mongoose');  // Import mongoose for ObjectId validation

const getLikeStatus = async (req, res) => {
    const userId = req.user._id;
    const gameId  = req.params;  // Access gameId from req.params
    console.log(gameId);   
    console.log(userId); 

    // Validate gameId
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        return res.status(400).json({ message: 'Invalid gameId' });
    }

    try {
        const likeStatus = await LikeTab.findOne({ id_user: userId, id_game: gameId });

        if (!likeStatus) {
            // If no like status exists, return with default as false
            return res.status(200).json({ liked: false });
        }

        return res.status(200).json({ liked: likeStatus.liked });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const toggleLike = async (req, res) => {
    const userId = req.user._id;
    const { gameId, liked } = req.body;

    // Validate gameId
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
        return res.status(400).json({ message: 'Invalid gameId' });
    }

    try {
        // Check if like record already exists
        const likeStatus = await LikeTab.findOne({ id_user: userId, id_game: gameId });

        if (likeStatus) {
            // If it exists, update the like status
            likeStatus.liked = liked;
            await likeStatus.save();
        } else {
            // If not, create a new like record
            const newLikeStatus = new LikeTab({
                id_user: userId,
                id_game: gameId,
                liked,
            });
            await newLikeStatus.save();
        }

        return res.status(200).json({ message: 'Like status updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getLikeStatus, toggleLike };
