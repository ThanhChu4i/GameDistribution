import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Controls popup with results
    const [searchVisible, setSearchVisible] = useState(false); // Controls search bar visibility

    useEffect(() => {
        if (searchTerm.trim()) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${process.env.SERVER_HOST}/api/search-games`, {
                        params: { searchTerm }
                    });
                    setResults(response.data.games || []);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        } else {
            setIsOpen(false);
            setResults([]);
        }
    }, [searchTerm]);

    const closePopup = () => {
        setIsOpen(false);
        setResults([]);
    };

    const toggleSearchBar = () => {
        setSearchVisible(!searchVisible);
        setSearchTerm(''); // Clear search term when closing
        setIsOpen(false);   // Close popup when search bar is hidden
    };

    return (
        <div className='search-container'>
            <div className='search-container-real'>
                {searchVisible && (
                    <input
                        className='Searchtext'
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}

                <button onClick={toggleSearchBar} className='search-button'>
                    <SearchIcon />
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
                                                <strong>{game.game_name}</strong>
                                                <p>{game.id_user?.company || 'Unknown Company'}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
