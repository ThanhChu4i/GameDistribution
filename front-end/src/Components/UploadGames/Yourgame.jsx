// Yourgames.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Yourgames = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token'); // Token riêng cho danh sách game

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/api/yourgames', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGames(response.data);
            } catch (error) {
                setError('Có lỗi xảy ra khi tải danh sách game.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, [token]);

    return (
        <div className='Your_Game'>
            <h3>Your Games</h3>
            <div className="games-grid">
                {loading && <p>Loading games...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && games.length === 0 && <p>No games found.</p>}
                {!loading && !error && games.map((game) => (
                    <div key={game._id} className="game-card">
                        <Link to={`/Games/${game.name}`}>
                            {game.imageUrl && <img src={game.imageUrl} alt="Game" />}
                            <h4>{game.game_name}</h4>
                        </Link>
                        <p>{game.company}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Yourgames;
