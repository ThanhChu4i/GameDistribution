const { Game } = require('../../collection/collection'); // Đường dẫn tới model collection MongoDB
const path = require('path');
const fs = require('fs');

// Tìm kiếm game theo bộ lọc và populate thông tin user
const getGames = async (req, res) => {
    try {
        const filters = {};

        // Handle filters based on query parameters
        if (req.query.genres) filters.genres = req.query.genres;
        if (req.query.development) filters.development = req.query.development;
        if (req.query.language) filters.language = req.query.language;
        if (req.query.players) filters.players = req.query.players;
        if (req.query.mobile) filters.mobile = req.query.mobile === 'yes';
        if (req.query.no_blood !== undefined) filters.no_blood = req.query.no_blood === 'true';
        if (req.query.child_friendly !== undefined) filters.child_friendly = req.query.child_friendly === 'true';
        if (req.query.ingame_purchases !== undefined) filters.ingame_purchases = req.query.ingame_purchases === 'true';

        // Add 'isActive' filter to show only active games
        filters.isActive = true;

        // Handle search term filter if provided
        if (req.query.search) {
            // Assuming search is done on game name or description, you can modify as needed
            filters.$or = [
                { game_name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Fetch games from the database with the applied filters
        const games = await Game.find(filters).populate('id_user', 'company'); // Populate with user company

        if (!games.length) {
            return res.status(404).json({ message: "No games found." });
        }

        // Format the games data
        const formattedGames = games.map(game => ({
            ...game._doc, // Copy all fields of the game
            company: game.id_user ? game.id_user.company : null, // Get company from user
            imageUrl: game.imagePath ? `http://${process.env.REACT_APP_API_URL}/api/games/image/${path.basename(game.imagePath)}` : null
        }));

        return res.status(200).json(formattedGames);
    } catch (err) {
        console.error('Error retrieving games:', err);
        return res.status(500).json({ message: "Server error." });
    }
};


module.exports = { getGames};
