import React from 'react';
import './Footer.css'; // Import file CSS của bạn
import logo from '../Assets/GD-FullLogo-2Line.png'
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
                    <a href='https://www.google.nl/maps/place/Azerion/@52.2779692,4.750998,17z/data=!3m1!4b1!4m6!3m5!1s0x47c60c686089387b:0x58146d40b5c1a299!8m2!3d52.2779692!4d4.750998!16s%2Fg%2F11cllgmc8y?entry=ttu' target="_blank" rel="noopener noreferrer">
  Boeing Avenue 30, 1119 PE Schiphol-Rijk, The Netherlands
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
