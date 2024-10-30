const { GameHistory } = require('../collection/collection');

// Hàm lấy 5 lịch sử chơi game gần nhất mà không trùng lặp
const getRecentGameHistory = async (req, res) => {
    try {
        // Lấy id_user từ request parameters hoặc token
        const userId = req.params.id || req.body.userId;

        // Tìm tất cả lịch sử chơi game của người dùng theo id_user, sắp xếp theo play_time giảm dần
        const history = await GameHistory.find({ id_user: userId })
            .populate('id_game')
            .sort({ play_time: -1 }); // Sắp xếp giảm dần theo thời gian chơi

        // Sử dụng một đối tượng để theo dõi các game đã gặp
        const uniqueGames = {};
        const recentGames = [];

        // Lọc ra 5 game gần nhất mà không trùng lặp
        for (const record of history) {
            if (!uniqueGames[record.id_game._id]) {
                uniqueGames[record.id_game._id] = true; // Đánh dấu game là đã gặp
                recentGames.push(record);
            }
            if (recentGames.length === 5) break; // Dừng lại khi đã có 5 game
        }

        // Nếu không tìm thấy lịch sử nào
        if (recentGames.length === 0) {
            return res.status(404).json({ message: 'No game history found for this user.' });
        }

        // Trả về danh sách 5 game gần nhất
        res.status(200).json(recentGames);
    } catch (error) {
        console.error('Error retrieving recent game history:', error);
        res.status(500).json({ error: 'Failed to retrieve game history' });
    }
};

module.exports = { getRecentGameHistory };
