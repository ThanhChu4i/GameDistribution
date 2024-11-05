import './GameDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [similarGames, setSimilarGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const setPlay = async () => {
        setIsPlaying(true);
        try {
            const gameHistory = { gameId: id };
            const token = Cookies.get('token');
            await axios.post('http://localhost:8081/api/gameHistory', gameHistory, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Game history saved successfully');
        } catch (error) {
            console.error('Error saving game history:', error);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    };

    const handleOpenInNewTab = () => {
        window.open(window.location.href, '_blank');
    };

    const handleCopyEmbed = (content) => {
        navigator.clipboard.writeText(content)
            .then(() => alert('Embed code copied!'))
            .catch(err => console.error('Failed to copy:', err));
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8081/api/games/${id}`);
                setGame(response.data.game);
                setSimilarGames(response.data.similarGames || []);
            } catch (err) {
                setError("Không thể tải thông tin game.");
            } finally {
                setLoading(false);
            }
        };
        fetchGameDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="game-details-container">
            <title>{game.game_name}</title>
            <div className="left-section">
                <div className="game-preview">
                    {!isPlaying ? (
                        <div className='preview-info'>
                            {game.imagePath && <img className='game-thumbnail' src={game.imagePath} alt={game.game_name} />}
                            <h1>{game.game_name}</h1>
                            <p>by {game.company}</p>
                            <button onClick={setPlay} className="play-button">Play Now</button>
                        </div>
                    ) : (
                        <iframe src={game.gamePath} width="1066" height="800" title="Game" />
                    )}
                </div>
                <div className='Share-and-open-in-new-tab'>
                    <button className='action-button' onClick={handleShare}><strong>Share</strong></button>
                    <button className='action-button' onClick={handleOpenInNewTab}><strong>Open in New Tab</strong></button>
                </div>

                <div className="game-details">
                    <div className='game-info'><strong>Game Title:</strong> {game.game_name}</div>
                    <div className='game-info'><strong>Publisher:</strong> {game.company}</div>
                    <div className='game-info'><strong>Platform:</strong> Web</div>
                    <div className='game-info'><strong>Language:</strong> English</div>
                    <div className='game-info'><strong>Genre:</strong> Casual</div>
                    <div className='game-info'><strong>Age Group:</strong> All Ages</div>
                </div>

                <div className="description-section">
                    <h3>Description</h3>
                    <p>{game.game_description}</p>
                </div>
                <div className="description-section">
                    <h3>Instructions</h3>
                    <p>{game.instruction}</p>
                </div>

                <div className="embed-section">
                    <h3>Embed</h3>
                    <textarea readOnly value={`http://localhost:3000/games/${id}`} />
                    <button onClick={() => handleCopyEmbed(`http://localhost:3000/games/${id}`)}>Copy</button>
                </div>
            </div>

            <div className="right-section">
                <div className="similar-games">
                    <h3>Similar Games</h3>
                    <div className='games-grid'>
                        {Array.isArray(similarGames) && similarGames.length > 0 ? (
                            similarGames.map((item) => (
                                <div key={item._id} className="game-card">
                                    <Link to={`/Games/${item._id}`}>
                                        {item.imagePath ? (
                                            <img src={item.imagePath} alt={item.game_name} />
                                        ) : (
                                            <div className="placeholder-image">No Image Available</div>
                                        )}
                                        <h4>{item.game_name}</h4>
                                    </Link>
                                    <p>{item.company || 'Unknown Company'}</p>
                                </div>
                            ))
                        ) : (
                            <p>No similar games found.</p>

                        )}
                    </div>
                </div>
                export default MyGameHistory;
                    <div className="tags-icons">
                    <h3>Tags</h3>
                    <p>{game.genres}</p>
                    <button>Download Thumbnails & Icons</button>
                    </div>

                    <div className="collections-carousel">
                    <h3>Collections</h3>
                    <div className="carousel">
                        <div className="collection-item">
                            <img src="collection_image_url" alt="Collection" />
                            <p>Exclusive</p>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default GameDetails;
