// commentRoutes.js
const express = require('express');
const {Comment} = require('../collection/collection'); // Adjust path as needed

// Get comments for a specific game
const getOldComment = async (req, res) => {
    const { gameId } = req.params;
    try {
        const comments = await Comment.find({ id_game: gameId }).populate('id_user', 'last_name first_name avatar'  ); // Populates username of the user
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error while fetching comments' });
    }
};

// Post a new comment
const newComment = async (req, res) => {
    const { id_game, comment } = req.body;
    const userId = req.user._id; // Assuming the auth middleware adds `user` to req

    if (!comment || !id_game) {
        return res.status(400).json({ error: 'Comment and game ID are required' });
    }

    try {
        const newComment = new Comment({
            id_user: userId,
            id_game,
            comment
        });
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ error: 'Server error while saving comment' });
    }
};

module.exports = {getOldComment, newComment};
