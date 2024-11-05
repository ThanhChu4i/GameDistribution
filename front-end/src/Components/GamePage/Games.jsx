import React from 'react';
import './Games.css';
import BodyGamePage from './BodyGamePage/BodyGamePage.jsx';
import imagf from './image/dc0d7b34d1e049df813ffa167a7fcc66-512x384.jpeg'
const Games = () => {
  return (
   <div className= "GamePage">
      <title>Game Catalog - HTML5 Games for Websites and Messengers</title>
      <div className="top-pick">
    <div className="top-section">
      <a href="https://example.com/link1" target="_blank" rel="noopener noreferrer" className="top-left">
        <div className="image-container">
          <img src={imagf} alt="Image 1" />
        </div>
      </a>
      <a href="https://example.com/link2" target="_blank" rel="noopener noreferrer" className="top-mid">
        <div className="image-container">
          <img src={imagf} alt="Image 2" />
        </div>
      </a>
      <a href="https://example.com/link3" target="_blank" rel="noopener noreferrer" className="top-right">
        <div className="image-container">
          <img src={imagf} alt="Image 3" />
        </div>
      </a>
    </div>
    </div>
          <BodyGamePage/>
    </div>
  );
}

export default Games;
