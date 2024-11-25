import React, { useContext, useState } from 'react';
import './Header.css';  
import { Link } from "react-router-dom";
import logo from '../Assets/Logo_XGame-011.png';
import defaultAvatar from '../Assets/avatar_default.webp'; // Default avatar image
import { AuthContext } from '../AuthContext/AuthContext'; // AuthContext
import Search from '../Search/Search';

const Header = ({ openLoginModal }) => {
  const { isLoggedIn, logout, isAdmin, isDevPub, avatarUser } = useContext(AuthContext); // Context values
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout(); // Logout handler
    setShowDropdown(false); // Close dropdown
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>
      </div>
      <div className="Linksd">
        <nav className="nav-linkss">
          <Link to="/Games">Games</Link>
          <div className="dropdownn">
            <Link>For Business</Link>
            <div className="dropdown-contentn">
              <div className="for-Publishers">
                <button className="btn">
                  Partnerships
                  <p>Discover GameDistribution's partnership models</p>
                </button>
                <button className="btn">
                  Direct Game Integration
                  <p>Experience the simple efficiency of Direct Game Integration</p>
                </button>
                <button className="btn">
                  White Label Gaming Solution
                  <p>Made-to-measure gaming solutions to boost your business</p>
                </button>
                <button className="btn">
                  FAQ
                  <p>All your questions answered - Browse our Publisher FAQ Guide</p>
                </button>
              </div>
              <div className="for-Developers">
                <button className="btn">
                  Partnerships
                  <p>Find out how GD helps game developers expand their reach</p>
                </button>
                <button className="btn">
                  Quality Guidelines
                  <p>Follow our guidelines to publish your games quickly and efficiently</p>
                </button>
                <button className="btn">
                  Dev Panel
                  <p>Head to our Developer Dashboard to manage your games</p>
                </button>
                <button className="btn">
                  FAQ
                  <p>All your questions answered - Browse our Developer FAQ Guide</p>
                </button>
              </div>
            </div>
          </div>
          <Link to="/News">News</Link>
          <Link to="/Support">Support</Link>
        </nav>
      </div>
      <div className="header-actions">
        <Search />

        {isLoggedIn ? (
          <div className="user-section">
            <img
              src={ avatarUser || defaultAvatar} // Use user avatar or default
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="user-dropdown">
                {isAdmin && (
                  <button className="btnbtn">
                    <Link to="/admin">Admin Setting</Link>
                  </button>
                )}
                <button className="btnbtn">
                  <Link to="/profile">Account Setting</Link>
                </button>
                {isDevPub && (
                  <button className="btnbtn">
                    <Link to="/Upload">Upload Game</Link>
                  </button>
                )}
                <button className="btnbtn">
                  <Link to="/change-password">Password Setting</Link>
                </button>
                <button className="btnbtn" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openLoginModal} className="login-button">
            Login/Register
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
