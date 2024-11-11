const { LikeTab } = require('../collection/collection');
const mongoose = require('mongoose');

const getLikeStatus = async (req, res) => {
    const userId = req.user._id;
    const id = req.query.id; // Lấy `id` từ `req.query` thay vì `req.body`

    // Validate gameId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid gameId' });
    }

    try {
        const likeStatus = await LikeTab.findOne({ id_user: userId, id_game: id });

        if (!likeStatus) {
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
    const { id, liked } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid gameId' });
    }

    try {
        const likeStatus = await LikeTab.findOne({ id_user: userId, id_game: id });

        if (likeStatus) {
            likeStatus.liked = liked;
            await likeStatus.save();
        } else {
            const newLikeStatus = new LikeTab({
                id_user: userId,
                id_game: id,
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
