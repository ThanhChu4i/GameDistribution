import './GameDetails.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const handleShare = () => {
    const url = window.location.href; // Lấy URL hiện tại
    navigator.clipboard.writeText(url) // Sao chép vào clipboard
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
};
const handleOpenInNewTab = () => {
    const url = window.location.href; // Lấy URL hiện tại
    window.open(url, '_blank'); // Mở URL trong tab mới
};
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

    if (loading) {
        return <div>Loading...</div>; // Hiển thị thông báo tải
    }

    if (error) {
        return <div>{error}</div>; // Hiển thị thông báo lỗi
    }

    return (
        <div className="game-details-container">
            {/* Phần bên trái */}
            <title>{game.game_name}</title>
            <div className="left-section">
                {/* Phần xem trước Game */}
                <div className="game-preview">
                    <div className='jtfct'>
                    {game.imagePath && <img className ='imgforGdtai' src={game.imagePath} alt={game.game_name} />}
                    <h1>{game.game_name}</h1>
                    <p>by {game.company}</p>
                    <button className="play-button">Play Now</button>
                    </div>
                </div>
                <div className='Share-and-open-in-new-tab'>
                <button className= 'SaOp' onClick={handleShare}><strong>Share</strong></button>
                <button className= 'SaOp' onClick={handleOpenInNewTab}><strong>Open in New Tab</strong></button>
                </div>
                {/* Thông tin chi tiết về Game */}
                <div className="game-details">
                    <div className='gameinfor'><strong>Game Title:</strong> {game.game_name}</div>
                    <div className='gameinfor'><strong>Publisher by:</strong> {game.company}</div>
                    <div className='gameinfor'><strong>Platform:</strong> Web</div> {/* Cập nhật thông tin đúng */}
                    <div className='gameinfor'><strong>Language:</strong> English</div> {/* Cập nhật thông tin đúng */}
                    <div className='gameinfor'><strong>Genre:</strong> Casual</div> {/* Cập nhật thông tin đúng */}
                    <div className='gameinfor'><strong>Age Group:</strong> All Ages</div> {/* Cập nhật thông tin đúng */}
                </div>

                {/* Mô tả và Hướng dẫn */}
                <div className="description-section">
                    <h3>Description</h3>
                    <p>{game.game_description}</p> {/* Hiển thị mô tả game */}
                </div>
                <div className="description-section">
                    <h3>Instructions</h3>
                    <p>{game.instruction}</p> {/* Hiển thị hướng dẫn */}
                </div>

                {/* Mã nhúng và URL ví dụ */}
                <div className="embed-section">
                    <h3>Embed</h3>
                    <textarea readOnly value="<iframe src='embed_code_here'></iframe>" />
                    <button>Copy</button>
                </div>
                <div className="embed-section">
                    <h3>Example URL</h3>
                    <textarea readOnly value={`http://localhost:8081/games/${id}`} />
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
                    <p><strong>Last Updated:</strong>{game.date_release}</p>
                    <p><strong>Type:</strong> HTML5</p>
                    <p><strong>Screen Orientation:</strong> Landscape</p>
                    <p><strong>Dimensions:</strong> 800x600</p>
                    <p><strong>Publisher:</strong> {game.company}</p>
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
