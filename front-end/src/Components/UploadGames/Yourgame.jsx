// Yourgames.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Yourgames = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/dev/yourgames', {
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
            <div className='titles'><strong>Your Games</strong></div>
            <div className="action-buttons">
            <button className ='save-button'><Link to='/User/Setting/Game'>Edit</Link></button>
            </div>
            <div className="games-gridq">
                {loading && <p>Loading games...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && games.length === 0 && <p>No games found.</p>}
                {!loading && !error && games.map((game) => (
                    <div key={game._id} className="game-cardq">
                        <Link to={`/Games/${game._id}`}>
                            {game.imagePath && <img src={game.imagePath} alt={game.game_name} />}
                            <div className= "namegame"><strong>{game.game_name}</strong></div>
                            <p>{game.company}</p>
                        </Link>                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Yourgames;
