import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "../Assets/like (1).png";
import noLike from "../Assets/like.png";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const { id } = useParams(); // Lấy id từ URL

    // Fetch the current like status from the database when component mounts
    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (id) {
                try {
                    const token = Cookies.get('token');
                    const response = await axios.get('http://localhost:8081/me/likeStatus', { 
                        params: { id },
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setLiked(response.data.liked); // Set the initial like status
                } catch (error) {
                    console.error('Error fetching like status:', error);
                }
            }
        };

        fetchLikeStatus();
    }, [id]);

    // Toggle like status and update it in the database
    const handleLikeToggle = async () => {
        try {
            const token = Cookies.get('token');
            await axios.post(
                'http://localhost:8081/me/toggleLike',
                { id, liked: !liked },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLiked(!liked); // Update the UI to reflect the new status
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    return (
        <button onClick={handleLikeToggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img src={liked ? Like : noLike} alt="Like button" width={40} height={40} />
        </button>
    );
};

export default LikeButton;
