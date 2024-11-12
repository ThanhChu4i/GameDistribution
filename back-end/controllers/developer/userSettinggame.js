const express = require('express');
const path = require('path');
const { Game} = require('../../collection/collection');

const getGamesWithUser = async (req, res) => {
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
            imageUrl: game.imagePath ? `http://localhost:8081/api/games/image/${path.basename(game.imagePath)}` : null
        }));
        return res.status(200).json(formattedGames);
    } catch (err) {
        console.error('Error retrieving games:', err);
        return res.status(500).json({ message: "Server error." });
    }
};
  
  // Update a user by ID
      const updateGame = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGame = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedGame) return res.status(404).json({ message: 'User not found' });
      res.json(updatedGame);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };
  
  // Delete a user by ID
   const deleteGame = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGame = await Game.findByIdAndDelete(id);
      if (!deletedGame) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  };
 module.exports = {getGamesWithUser, updateGame, deleteGame}
