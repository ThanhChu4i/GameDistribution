import React from 'react';
import './Footer.css'; // Import file CSS của bạn
import logo from '../Assets/Logo_XGame-011.png'
import location from '../Assets/location.svg'
import linkin from '../Assets/social-link.svg'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="left-sectionn">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    
                </div>
                <div className="mid-section">
                <img src={location} alt="Logo" className="location-logo" />
                    <a href='https://maps.app.goo.gl/4cWBFyxXYX1U2pJw9' target="_blank" rel="noopener noreferrer">
                    9 Đ. Phạm Văn Đồng, Mai Dịch, Cầu Giấy, Hà Nội 10000, Việt Nam
</a></div>
                <div className="right-section">
                    <p>Follow us</p>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkin} alt="LinkedIn" className="social-icon" />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Azerion Copyright 2017 - 2023 | <a href="/Privacy">Privacy policy</a> - <a href="#">Platform Privacy policy</a> - <a href="#">Terms & conditions</a></p>
            </div>
        </footer>
    );
};

export default Footer;
