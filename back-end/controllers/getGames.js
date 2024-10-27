const { Game } = require('../collection/collection'); // Đường dẫn tới model collection MongoDB
const path = require('path');
const fs = require('fs');
const getGameImage = (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../../storage', imageName);

    // Kiểm tra xem file có tồn tại không
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Image not found:', imageName);
            return res.status(404).json({ error: 'Image not found' });
        }
        // Gửi file ảnh nếu tồn tại
        res.sendFile(imagePath);
    });
};

const getGames = async (req, res) => {
    try {
        const filters = {};

        // Áp dụng các bộ lọc dựa trên query parameters
        if (req.query.genres) filters.genres = req.query.genres;
        if (req.query.development) filters.development = req.query.development;
        if (req.query.languages) filters.languages = req.query.languages;
        if (req.query.players) filters.players = req.query.players;
        if (req.query.mobile) filters.mobile = req.query.mobile === 'yes';
        if (req.query.no_blood !== undefined) filters.no_blood = req.query.no_blood === 'true';
        if (req.query.child_friendly !== undefined) filters.child_friendly = req.query.child_friendly === 'true';
        if (req.query.ingame_purchases !== undefined) filters.ingame_purchases = req.query.ingame_purchases === 'true';

        // Tìm kiếm game theo bộ lọc và populate thông tin user
        const games = await Game.find(filters).populate('id_user', 'company email');

        // Tạo URL hình ảnh dựa trên tên file ảnh trong storage
        const gamesWithImageURLs = games.map((game) => ({
            ...game.toObject(),
            imageUrl: game.imagePath ? `http://localhost:8081/api/games/image/${path.basename(game.imagePath)}` : null
        }));
        
        res.json(gamesWithImageURLs);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getGames, getGameImage };

