import React from 'react';
import './Eclusive.css';
// import { Link } from "react-router-dom";
import img2 from './image/GD-News.png';
import img from './image/dc0d7b34d1e049df813ffa167a7fcc66-512x384.jpeg'
const Eclusive = () => {
    const images = [
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
        { src: img, link: 'https://link1.com' },
    ];

    const handleClick = (link) => {
        window.location.href = link;
    };
    return (
        <div className='main'>
        <div className="grid-container">
            {images.map((image, index) => (
                <div key={index} className="grid-item" onClick={() => handleClick(image.link)}>
                    <img src={image.src} alt={`Image ${index + 1}`} className="image" />
                </div>
            ))}
        </div>     
        </div>     
    );
};

export default Eclusive