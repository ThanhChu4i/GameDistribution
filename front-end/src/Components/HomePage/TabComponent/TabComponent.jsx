import React, { useState, useEffect, useRef } from 'react';
import './TabComponent.css';
import Eclusive from '../Eclusive/Eclusive.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const totalTabs = 5;
    const switchTime = 20000; // 20 giây
    const updateInterval = 1000; // 1 giây

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gamesData, setGamesData] = useState(Array(totalTabs).fill([])); // Mảng dữ liệu cho từng tab

    // Tham chiếu để theo dõi interval và timeout
    const intervalRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const newGamesData = [];
                // Giả định rằng API cung cấp dữ liệu cho từng tab theo URL khác nhau
                for (let i = 1; i <= totalTabs; i++) {
                    const response = await axios.get(`http://localhost:8081/games/tab${i}`); // Thay đổi URL cho phù hợp
                    newGamesData.push(response.data); // Thêm dữ liệu vào mảng
                }
                setGamesData(newGamesData); // Cập nhật dữ liệu
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []); // Chạy 1 lần khi component mount

    useEffect(() => {
        // Tạo interval để cập nhật progress
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) return 0;
                return prevProgress + (100 / (switchTime / updateInterval));
            });
        }, updateInterval);

        // Tạo timeout để chuyển tab sau 20 giây
        timerRef.current = setTimeout(() => {
            handleNextTab();
        }, switchTime);

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timerRef.current);
        };
    }, [activeTab]); // Chạy lại mỗi khi tab thay đổi

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setProgress(0);
    };

    const handleNextTab = () => {
        setActiveTab((prevTab) => (prevTab + 1) % totalTabs);
        setProgress(0);
    };

    const handlePrevTab = () => {
        setActiveTab((prevTab) => (prevTab - 1 + totalTabs) % totalTabs);
        setProgress(0);
    };

    return (
        <div className="tab-container">
            <div className="tab-header">
                <nav className='nav-links'>
                    <Link to="/Games"><strong>Exclusive Games</strong></Link>
                </nav>
                <div className='butt'>
                    <button className='tab-buttonn' onClick={handlePrevTab}>Prev</button>
                    {[...Array(totalTabs)].map((_, index) => (
                        <button
                            key={index}
                            className={`tab-button ${activeTab === index ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className='tab-buttonn' onClick={handleNextTab}>Next</button>
                </div>          
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="tab-content">
                {/* {activeTab === 0 && <Eclusive />} */}
                {activeTab >= 0 && (
                    <div className='game-list'>
                        <div className="games-grid">
                            {loading && <p>Loading games...</p>}
                            {error && <p>Error loading games: {error}</p>}
                            {!loading && gamesData[activeTab].length === 0 && <p>No games found.</p>}
                            {!loading && gamesData[activeTab].map((game) => (
                                <div key={game.id_game} className="game-card">
                                    <Link to={`/Games/${game.game_name}`}>
                                        <img src={game.img || `https://via.placeholder.com/150`} alt={game.game_name} />
                                        <h4>{game.game_name}</h4>
                                    </Link>
                                    <p>{game.company}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabComponent;
