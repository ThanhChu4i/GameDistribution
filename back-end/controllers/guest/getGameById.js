const { Game } = require('../../collection/collection'); // Import model Game
const path = require('path');

const getGameById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find game by id and populate related user (fetch only 'company' field)
        const game = await Game.findOne({_id: id, isActive: true }).populate('id_user', 'company');
        if (!game) {
            return res.status(404).json({ message: 'Game không tồn tại' });
        }

        const similarGenres = game.genres;

        // Format main game data
        const formattedGame = {
            ...game._doc,
            company: game.id_user ? game.id_user.company : null,
            imageUrl: game.imagePath ? `http://${process.env.REACT_APP_API_URL}/api/games/image/${path.basename(game.imagePath)}` : null
        };

        // Find similar games based on genres, excluding the current game
        const similarGames = await Game.find({ genres: { $in: similarGenres }, _id: { $ne: id }, isActive: true }).populate('id_user', 'company').limit(6);

        // Format similar games data
        const formattedSimilarGames = similarGames.map(similarGame => ({
            ...similarGame._doc,
            company: similarGame.id_user ? similarGame.id_user.company : null,
            imageUrl: similarGame.imagePath ? `http://${process.env.REACT_APP_API_URL}/api/games/image/${path.basename(similarGame.imagePath)}` : null
        }));

        // Send both game and formatted similar games in response
        res.status(200).json({ game: formattedGame, similarGames: formattedSimilarGames });
    } catch (error) {
        console.error("Error in getGameById:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin game' });
    }
};

module.exports = { getGameById };
