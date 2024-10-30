import './GameDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const userid = Cookies.get('id_user')
const GameDetails = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const setPlay = async () => {
        setIsPlaying(true);
        try {
            // Tạo lịch sử game mới
            const gameHistory = {
                userId: userid,
                gameId: id
            };
    
            // Gửi yêu cầu POST tới server để lưu lịch sử game
            await axios.post('http://localhost:8081/api/gameHistory', gameHistory);
    
            console.log('Game history saved successfully');
        } catch (error) {
            console.error('Error saving game history:', error);
        }
    };

    const handleShare = () => {
        const url = window.location.href; // Lấy URL hiện tại
        navigator.clipboard.writeText(url)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleOpenInNewTab = () => {
        window.open(window.location.href, '_blank'); // Mở URL trong tab mới
    };

    const handleCopyEmbed = (content) => {
        navigator.clipboard.writeText(content)
            .then(() => alert('Embed code copied!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8081/api/games/${id}`);
                setGame(response.data);
            } catch (err) {
                setError("Không thể tải thông tin game.");
            } finally {
                setLoading(false);
            }
        };
        fetchGameDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                        <iframe src={game.gamePath} width="1066" height="800" title="Game"/>
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
                    <textarea readOnly value={"http://localhost:3000/games/${id}/"} />
                    <button onClick={() => handleCopyEmbed(`http://localhost:3000/games/${id}/`)}>Copy</button>
                </div>
                <div className="embed-section">
                    <h3>Example URL</h3>
                    <textarea readOnly value={`http://localhost:8081/games/${id}`} />
                    <button onClick={() => handleCopyEmbed(`http://localhost:8081/games/${id}`)}>Copy</button>
                </div>
            </div>

            <div className="right-section">
                <div className="similar-games">
                    <h3>Similar Games</h3>
                    <div className="similar-games-grid">
                        <div className="similar-game-card">
                            <img src="similar_game_image_url" alt="Similar Game" />
                            <p>Color Sort Puzzle</p>
                        </div>
                    </div>
                </div>

                <div className="additional-info">
                    <h3>Additional Information</h3>
                    <p><strong>Last Updated:</strong> {game.date_release}</p>
                    <p><strong>Type:</strong> HTML5</p>
                    <p><strong>Screen Orientation:</strong> Landscape</p>
                    <p><strong>Dimensions:</strong> 800x600</p>
                    <p><strong>Publisher:</strong> {game.company}</p>
                </div>

                <div className="tags-icons">
                    <h3>Tags</h3>
                    <p>Color, Sort, Casual</p>
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
