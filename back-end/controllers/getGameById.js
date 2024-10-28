// controllers/gameController.js

const {Game} = require('../collection/collection'); // Import model Game (đảm bảo bạn đã định nghĩa model Game)

const getGameById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL

        // Tìm game bằng id
        const game = await Game.findById(id).populate('id_user'); // populate để lấy thông tin company từ user liên quan nếu có
         console.log(game);
        if (!game) {
            return res.status(404).json({ message: 'Game không tồn tại' });
        }

        res.status(200).json(game); // Trả về thông tin game
    } catch (error) {
        console.error("Error in getGameById:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin game' });
    }
};

module.exports = { getGameById };
