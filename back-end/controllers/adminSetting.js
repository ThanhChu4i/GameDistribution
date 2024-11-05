const express = require('express');
const {User, Game } = require('../collection/collection'); // Assuming you have a User model

// Get all users
  const getUser =  async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Update a user by ID
    const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete a user by ID
 const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
// Get all users
const getGames =  async (req, res) => {
    try {
      const games = await Game.find();
      res.json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch games' });
    }
  };
  
  // Update a user by ID
      const updateGame = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
      res.json(updatedGame);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update game' });
    }
  };
  
  // Delete a user by ID
   const deleteGame = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGame = await Game.findByIdAndDelete(id);
      if (!deletedGame) return res.status(404).json({ message: 'Game not found' });
      res.json({ message: 'Game deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete game' });
    }
  };
 module.exports = {getUser, updateUser, deleteUser, getGames, updateGame, deleteGame}
