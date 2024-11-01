import React, { useContext, useState } from 'react';
import './Header.css';  
import { Link } from "react-router-dom";
import logo from '../Assets/Logo_XGame-011.png';
import userAvatar from '../Assets/avatar_default.webp'; // Đường dẫn tới ảnh avatar mặc định
import { AuthContext } from '../AuthContext/AuthContext'; // Nhập AuthContext
import Search from '../Search/Search';

const Header = ({ openLoginModal }) => { // State cho việc hiển thị thanh tìm kiếm
  const { isLoggedIn, logout } = useContext(AuthContext); // Lấy trạng thái đăng nhập và hàm logout
  const [showDropdown, setShowDropdown] = useState(false); // State cho dropdown user
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout(); // Xử lý việc đăng xuất
    setShowDropdown(false); // Đóng dropdown
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>
      </div>
      <nav className="nav-linkss">
        <Link to="/Games">Games</Link>
        <div className="dropdown">
          <button className="custom-button">For Business</button>
          <div className="dropdown-content">
            <div className="for-Publishers">
              <button className='btn'>Partnerships     
                <p>Discover GameDistribution's partnership models</p> 
              </button> 
              <button className='btn'>Direct Game Integration 
                <p>Experience the simple efficiency of Direct Game Integration</p>
              </button> 
              <button className='btn'>White Label Gaming Solution 
                <p>Made-to-measure gaming solutions to boost your business</p>
              </button> 
              <button className='btn'>FAQ
                <p>All your questions answered - Browse our Publisher FAQ Guide</p>
              </button> 
            </div>
            <div className='for-Developers'>
              <button className='btn'>Partnerships
                <p>Find out how GD helps game developers expand their reach</p>
              </button> 
              <button className='btn'>Quality Guidelines
                <p>Follow our guidelines to publish your games quickly and efficiently</p>
              </button>          
              <button className='btn'>Dev Panel
                <p>Head to our Developer Dashboard to manage your games</p>
              </button>     
              <button className='btn'>FAQ 
                <p>All your questions answered - Browse our Developer FAQ Guide</p>
              </button>        
            </div>
          </div>
        </div>

        <Link to="/News">News</Link>
        <Link to="/Support">Support</Link>
      </nav>

      <div className="header-actions">       
        <Search />
        
        {isLoggedIn ? (
          <div className="user-section">
            <img
              src={userAvatar} 
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="user-dropdown">
                <button className='btnbtn'><Link to="/profile">Account Setting</Link></button>
                <button className='btnbtn'><Link to="/Upload">Upload Game</Link></button>
                <button className='btnbtn'><Link to="/change-password">Password Setting</Link></button>
                <button className='btnbtn' onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={openLoginModal} className="login-button">Login/Register</button>
        )}
      </div>
    </header>
  );
};

export default Header;
