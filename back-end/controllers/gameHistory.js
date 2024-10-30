const { GameHistory } = require('../collection/collection');

// Hàm lưu lịch sử chơi game mới
const gameHistory = async (req, res) => {
    try {
        const { userId, gameId } = req.body; // Destructure userId and gameId from the request body

        // Kiểm tra xem userId và gameId có tồn tại không
        if (!userId || !gameId) {
            return res.status(400).json({ error: 'userId and gameId are required' });
        }

        // Tạo dữ liệu lịch sử game từ request body
        const newGameHistory = new GameHistory({
            id_user: userId,
            id_game: gameId,
            play_time: new Date() // Tạo thời gian lưu lịch sử
        });
        // Lưu lịch sử game vào cơ sở dữ liệu
        await newGameHistory.save();

        res.status(201).json({ message: 'Game history saved successfully', gameHistory: newGameHistory });
    } catch (error) {
        console.error('Error saving game history:', error);
        res.status(500).json({ error: 'Failed to save game history' });
    }
};

module.exports = { gameHistory };
