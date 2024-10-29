const { Game } = require('../collection/collection'); // Import model Game
const path = require('path');
const getGameById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL

        // Tìm game bằng id và populate user liên quan
        const game = await Game.findById(id).populate('id_user', 'company'); // Chỉ lấy trường company từ User
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'Game không tồn tại' });
        }

        // Định dạng game để trả về
        const formattedGame = {
            ...game._doc, // Sao chép tất cả các trường của game
            company: game.id_user ? game.id_user.company : null, // Lấy company từ user
            imageUrl: game.imagePath ? `http://localhost:8081/api/games/image/${path.basename(game.imagePath)}` : null
        };

        res.status(200).json(formattedGame); // Trả về thông tin game đã định dạng
    } catch (error) {
        console.error("Error in getGameById:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin game' });
    }
};

module.exports = { getGameById };
