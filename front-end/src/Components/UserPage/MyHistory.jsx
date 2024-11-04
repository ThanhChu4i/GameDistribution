import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './MyHistory.css';

const MyGameHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchGameHistory = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(
                    'http://localhost:8081/api/gameHistory/History',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // Kiểm tra nếu dữ liệu trả về chứa danh sách lịch sử trong `data`
                setHistory(response.data.data || response.data);
            } catch (error) {
                console.error('Error fetching game history:', error);
            }
        };

        fetchGameHistory();
    }, []);

    return (
        <div className='Your_Game'>
            <h1>My Game History</h1>
            <div className='games-grid'>
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item._id} className="game-card">
                            <Link to={`/Games/${item.id_game._id}`}>
                                {item.id_game.imagePath ? (
                                    <img src={item.id_game.imagePath} alt={item.id_game.game_name} />
                                ) : (
                                    <div className="placeholder-image">No Image Available</div>
                                )}
                                <h4>{item.id_game.game_name}</h4>
                            </Link>
                            <p>{item.id_game.company || 'Unknown Company'}</p>
                        </div>
                    ))
                ) : (
                    <p>No game history found.</p>
                )}
            </div>
        </div>
    );
};

export default MyGameHistory;
