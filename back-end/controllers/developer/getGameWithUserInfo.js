const { Game } = require('../../collection/collection');
const path = require ('path');
const getGamesWithUserInfo = async (req, res) => {
    try {
        // Lấy id_user từ token đã được giải mã
        const id_user = req.user._id;
        // Lọc game theo id_user
        const games = await Game.find({ id_user }).populate('id_user', 'company'); // populate với trường company

        if (!games.length) {
            return res.status(404).json({ message: "No games found for this user." });
        }

        const formattedGames = games.map(game => ({
            ...game._doc, // Sao chép tất cả các trường của game
            company: game.id_user ? game.id_user.company : null, // Lấy company từ user
            imageUrl: game.imagePath ? `http://45.77.32.24:8081/api/games/image/${path.basename(game.imagePath)}` : null
        }));
        return res.status(200).json(formattedGames);
    } catch (err) {
        console.error('Error retrieving games:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { getGamesWithUserInfo };
