import React, { useState, useEffect, useRef } from 'react';
import './TabComponent.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const totalTabs = 5;
    const switchTime = 20000; // 20 seconds
    const updateInterval = 1000; // 1 second

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gamesData, setGamesData] = useState(Array(totalTabs).fill([])); // Array to hold data for each tab

    // Refs to manage interval and timeout
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    // Fetch games data once when component mounts
    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const requests = Array.from({ length: totalTabs }, (_, i) =>
                    axios.get(`http://localhost:8081/api/games/tab/${i + 1}`)
                );
                const responses = await Promise.all(requests);
                setGamesData(responses.map((response) => response.data));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []); // Run once on component mount

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + (100 / (switchTime / updateInterval))
            );
        }, updateInterval);

        return () => clearInterval(intervalRef.current);
    }, []); // Run once on component mount

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            handleNextTab();
        }, switchTime);

        return () => clearTimeout(timeoutRef.current);
    }, [activeTab]); // Reset timeout each time activeTab changes

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
                <nav className="nav-links">
                    <Link to="/Games"><strong>Exclusive Games</strong></Link>
                </nav>
                <div className='tabandprogess'>
                <div className="butt">
                    <button className="tab-buttonn" onClick={handlePrevTab}>Prev</button>
                    {[...Array(totalTabs)].map((_, index) => (
                        <button
                            key={index}
                            className={`tab-buttone ${activeTab === index ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className="tab-buttonn" onClick={handleNextTab}>Next</button>
                </div>
                <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            </div>
            </div>
            <div className="tab-content">
                {activeTab >= 0 && (
                    <div className="game-listtd">
                        <div className="games-gridd">
                            {loading && <p>Loading games...</p>}
                            {error && <p>Error loading games: {error}</p>}
                            {!loading && gamesData[activeTab] && gamesData[activeTab].length === 0 && <p>No games found.</p>}
                            {!loading && gamesData[activeTab] && gamesData[activeTab].map((game) => (
                                <div key={game._id} className="game-cardd">
                                <Link to={`/Games/${game._id}`}>
                                {game.imagePath && <img src={game.imagePath} alt={game.game_name} />}
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
