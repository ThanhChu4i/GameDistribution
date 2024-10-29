import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import searchIcon from '../Assets/icons8-search-48.png';
import { Link } from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State để theo dõi trạng thái popup

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/api/search-games`, {
                params: { searchTerm }
            });
            setResults(response.data.games || []);
            setIsOpen(true); // Mở popup khi có kết quả
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setIsOpen(false); // Đóng popup
        setResults([]); // Xóa kết quả khi đóng popup
    };

    return (
        <div className='search-container'>
            <input
                className='Searchtext'
                type="text"
                placeholder="Enter game name or company name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className='search-button'>
                <img src={searchIcon} alt="Search" className='search-icon' />
            </button>

            {isOpen && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : results.length > 0 ? (
                            results.map((game, index) => (
                                <div className='search' key={index}>
                                    <Link className='link' to={`/Games/${game._id}`}>
                                        {game.imagePath && <img className='searchimg' src={game.imagePath} alt={game.game_name} />}
                                        <div className='searchinfo'>
                                            <strong>{game.id_user.company}</strong>
                                            <p>{game.game_name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
