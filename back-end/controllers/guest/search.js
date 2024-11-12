const { Game, User } = require('../../collection/collection');

// Controller function for searching games based on searchTerm
const searchGames = async (req, res) => {
    try {
        const { searchTerm } = req.query; // Extract search term from query
        // Exit early if searchTerm is empty
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        // Filter for games by name or user by company name
        const gameFilter = { game_name: { $regex: searchTerm, $options: "i" }, isActive: true };
        const userFilter = { company: { $regex: searchTerm, $options: "i" } };

        // Find all users that match the company name condition
        const users = await User.find(userFilter).select('_id'); // Only select user IDs

        // Get the list of user IDs
        const userIds = users.map(user => user._id);

        // Find games matching the name filter or having a user ID in the userIds list
        const games = await Game.find({
            $or: [
                gameFilter,
                { id_user: { $in: userIds } }
            ]
        }).select(' _id game_name imagePath  id_user') // Limit returned fields if needed
          .populate('id_user', 'company');
          console.log(games);
        res.json({ games });
    } catch (error) {
        console.error("Error searching games:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { searchGames };
