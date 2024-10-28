
import './GameDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GameDetails = () => {
        const { id } = useParams(); // Lấy id từ URL
        const [game, setGame] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
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
    return (
        <div className="game-details-container">
            {/* Phần bên trái */}
            <div className="left-section">
                {/* Phần xem trước Game */}
                <div className="game-preview">
                    <img src="game_image_url_here" alt="Game Preview" className="game-main-image" />
                    <h1>Sort Resort</h1>
                    <p>by Aversion Casual Games</p>
                    <button className="play-button">Play Now</button>
                </div>
                <div className='Share-and-open-in-new-tab'>
                    <button className='SaOp'><strong>Share</strong></button>
                    <button className='SaOp'><strong>Open in new tab</strong></button>
                </div>
                {/* Thông tin chi tiết về Game */}
                <div className="game-details">
                    <div className='gameinfor'><strong>Game Title:</strong></div>
                    <div className='gameinfor'><strong>Publisher by:</strong></div>
                    <div className='gameinfor'><strong>Platfom:</strong></div>
                    <div className='gameinfor'><strong>Language:</strong></div>
                    <div className='gameinfor'><strong>Gender:</strong></div>
                    <div className='gameinfor'><strong>Age Group</strong></div>
                </div>

                {/* Mô tả và Hướng dẫn */}
                <div className="description-section">
                    <h3>Description</h3>
                    <p>Unleash your creativity and puzzle-solving skills in this unique game!...</p>
                </div>
                <div className="description-section">
                    <h3>Instructions</h3>
                    <p>Your task is to sort the liquids into the correct flasks...</p>
                </div>

                {/* Mã nhúng và URL ví dụ */}
                <div className="embed-section">
                    <h3>Embed</h3>
                    <textarea readOnly value="<iframe src='embed_code_here'></iframe>" />
                    <button>Copy</button>
                </div>
                <div className="embed-section">
                    <h3>Example URL</h3>
                    <textarea readOnly value="example_url_here" />
                    <button>Copy</button>
                </div>
            </div>

            {/* Phần bên phải */}
            <div className="right-section">
                {/* Game tương tự */}
                <div className="similar-games">
                    <h3>Similar Games</h3>
                    <div className="similar-games-grid">
                        <div className="similar-game-card">
                            <img src="similar_game_image_url" alt="Similar Game" />
                            <p>Color Sort Puzzle</p>
                        </div>
                        {/* Thêm các game tương tự */}
                    </div>
                </div>

                {/* Thông tin bổ sung */}
                <div className="additional-info">
                    <h3>Additional Information</h3>
                    <p><strong>Last Updated:</strong> Sep 16, 2024</p>
                    <p><strong>Type:</strong> HTML5</p>
                    <p><strong>Screen Orientation:</strong> Landscape</p>
                    <p><strong>Dimensions:</strong> 800x600</p>
                    <p><strong>Publisher:</strong> Aversion Casual Games</p>
                </div>

                {/* Tags và Biểu tượng */}
                <div className="tags-icons">
                    <h3>Tags</h3>
                    <p>Color, Sort, Casual</p>
                    <button>Download Thumbnails & Icons</button>
                </div>

                {/* Bộ sưu tập */}
                <div className="collections-carousel">
                    <h3>Collections</h3>
                    <div className="carousel">
                        <div className="collection-item">
                            <img src="collection_image_url" alt="Collection" />
                            <p>Exclusive</p>
                        </div>
                        {/* Thêm các bộ sưu tập */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
