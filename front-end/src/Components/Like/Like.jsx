import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "../Assets/like (1).png";
import noLike from "../Assets/like.png";
import Cookies from 'js-cookie';

const LikeButton = ({ userId, gameId }) => {
    const [liked, setLiked] = useState(false);

    // Fetch the current like status from the database on component mount
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(`http://localhost:8081/me/likeStatus/${userId}/${gameId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLiked(response.data.liked); // Set the initial like status
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };
        
        fetchLikeStatus();
    }, [userId, gameId]);

    // Toggle like status and update it in the database
    const handleLikeToggle = async () => {
        try {
            const token = Cookies.get('token');
            await axios.post(
                'http://localhost:8081/me/toggleLike',
                { userId, gameId, liked: !liked },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLiked(!liked); // Update the UI to reflect the new status
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    return (
        <button onClick={handleLikeToggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={liked ? Like : noLike} alt="Like button" width={24} height={24} />
        </button>
    );
};

export default LikeButton;
