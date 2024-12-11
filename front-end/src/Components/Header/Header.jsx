import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo_XGame-011.png';
import defaultAvatar from '../Assets/avatar_default.webp'; // Default avatar image
import { AuthContext } from '../AuthContext/AuthContext'; // AuthContext
import Search from '../Search/Search';

const Header = ({ openLoginModal }) => {
  const { isLoggedIn, logout, isAdmin, isDeveloper, isPublisher, avatarUser } = useContext(AuthContext); // Context values
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state
  const [menuOpen, setMenuOpen] = useState(false); // State for controlling menu visibility on small screens
  const [isMobileView, setIsMobileView] = useState(false); // State to track if screen size is mobile

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout(); // Logout handler
    setShowDropdown(false); // Close dropdown
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the visibility of the menu
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // Check if the screen width is less than 768px
    };

    handleResize(); // Check initially
    window.addEventListener('resize', handleResize); // Listen for window resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup event listener
  }, []);

  return (
    <header className="header">
      {isMobileView ? (
        <div className='mobliesize'>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="header-actions">
            <Search />
            {isLoggedIn ? (
              <div className="user-section">
                <img
                  src={avatarUser || defaultAvatar} // Use user avatar or default
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
                    {isDeveloper && (
                      <button className="btnbtn">
                        <Link to="/Upload-Dev">Upload Game for Developer</Link>
                      </button>
                    )}
                    {isPublisher && (
                      <button className="btnbtn">
                        <Link to="/Upload-Pub">Upload Game for Publisher</Link>
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
          <button className="menu-icon" onClick={toggleMenu} style={{ color: 'black' }}>
            &#9776; {/* Hamburger icon */}
          </button>
          <div className={`Linksd ${menuOpen ? 'open' : ''} ${isMobileView ? 'mobile-view' : ''}`}>
            <nav className="nav-linkss">
              <Link to="/Games"><strong>Games</strong></Link>
              <div className="dropdownn">
                <span className="menu-link"><strong>For Business</strong></span>
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
              <Link to="/News"><strong>News</strong></Link>
              <Link to="/Support"><strong>Support</strong></Link>
            </nav>
          </div>
        </div>
      ) : (
        <div className='fullsize'>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="Linksd">
            <nav className="nav-linkss">
              <Link to="/Games"><strong>Games</strong></Link>
              <div className="dropdownn">
                <span className="menu-link"><strong>For Business</strong></span>
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
              <Link to="/News"><strong>News</strong></Link>
              <Link to="/Support"><strong>Support</strong></Link>
            </nav>
          </div><div className="header-actions">
            <Search />
            {isLoggedIn ? (
              <div className="user-section">
                <img
                  src={avatarUser || defaultAvatar} // Use user avatar or default
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
                    {isDeveloper && (
                      <button className="btnbtn">
                        <Link to="/Upload-Dev">Upload Game for Developer</Link>
                      </button>
                    )}
                    {isPublisher && (
                      <button className="btnbtn">
                        <Link to="/Upload-Pub">Upload Game for Publisher</Link>
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
        </div>)}

    </header>
  );
};

export default Header;
