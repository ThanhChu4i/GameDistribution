import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Comment = () => {
    const { id } = useParams(); // Assuming `id` is the game ID
    const [oldComment, setOldComment] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch old comments when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/me/comment/${id}`);
                setOldComment(response.data); // Assuming the API returns an array of comments
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id]);

    // Save new comment
    const handleCommentSubmit = async () => {
        try {
            const token = Cookies.get('token');
            await axios.post('http://localhost:8081/me/comment', 
                { id_game: id, comment: newComment }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewComment(''); // Clear the input field after submission
            setOldComment((prevComments) => [...prevComments, { comment: newComment }]);
            console.log('Comment saved successfully');
        } catch (error) {
            console.error('Error saving comment:', error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {oldComment.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment"
            />
            <button onClick={handleCommentSubmit}>Submit</button>
        </div>
    );
};

export default Comment;
