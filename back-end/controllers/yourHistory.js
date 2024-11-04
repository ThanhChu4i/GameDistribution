const { GameHistory } = require('../collection/collection');

// Function to get the 5 most recent unique game histories with uploader's company info
const getRecentGameHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) return res.status(400).json({ message: 'User ID is missing in the request.' });
        
        // Populate id_game and id_user within id_game to get uploader info
        const history = await GameHistory.find({ iduser: userId })
            .populate({
                path: 'id_game',
                populate: {
                    path: 'id_user', // Populate id_user within id_game to get uploader details
                    select: 'company' // Chỉ lấy thuộc tính company
                }
            })
            .sort({ play_time: -1 })
            .lean();

        // Lọc 5 game gần nhất không trùng lặp
        const uniqueGames = {};
        const recentGames = [];

        for (const record of history) {
            if (!uniqueGames[record.id_game._id]) {
                uniqueGames[record.id_game._id] = true;
                recentGames.push(record);
            }
            if (recentGames.length === 5) break;
        }
           console.log(recentGames);
        if (recentGames.length === 0) {
            return res.status(404).json({ message: 'No game history found for this user.' });
        }

        res.status(200).json({ data: recentGames });
    } catch (error) {
        console.error('Error retrieving recent game history:', error);
        res.status(500).json({ error: 'Failed to retrieve game history' });
    }
};

module.exports = { getRecentGameHistory };
