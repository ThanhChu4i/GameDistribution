const { GameHistory } = require('../collection/collection');

// Hàm lấy toàn bộ lịch sử chơi game của một người dùng
const yourHistory = async (req, res) => {
    try {
        // Lấy id_user từ request parameters hoặc token
        const userId = req.params.id || req.body.userId;

        // Tìm tất cả lịch sử chơi game của người dùng theo id_user
        const history = await GameHistory.find({ id_user: userId }).populate('id_game');
         console.log(history);
        // Nếu không tìm thấy lịch sử nào
        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'No game history found for this user.' });
        }

        // Trả về danh sách lịch sử chơi game
        res.status(200).json(history);
    } catch (error) {
        console.error('Error retrieving game history:', error);
        res.status(500).json({ error: 'Failed to retrieve game history' });
    }
};

module.exports = { yourHistory };
