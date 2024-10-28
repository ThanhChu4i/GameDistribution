import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import { AuthContextProvider } from './Components/AuthContext/AuthContext.js';
import React, { useState } from 'react'; // Import useState
import Header from './Components/Header/Header.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import Support from './Components/Support/Support.jsx';
import Games from './Components/GamePage/Games.jsx';
import News from './Components/News/News.jsx';
import LoginRegisterModal from './Components/LoginModal/LoginRegisterPopup/LoginRegisterPopup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import AdminPage from './Components/admindash-main/src/AdminPage.jsx';
import UserManagementPage from './Components/UserPage/UsermanagementPage.jsx';
import GameDetails from './Components/GameDetails/GameDetails.jsx';
import GameUploadPage from './Components/UploadGames/GameUploadPage.jsx';
import ChangePassword from './Components/UserPage/ChangePassword.jsx';
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State để quản lý modal login
  return (
    <Router>
      <AuthContextProvider>
      <div className="App">
        <Header openLoginModal={() => setIsLoginModalOpen(true)} /> {/* Pass function để mở modal */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/Support" element={<Support />} />
          <Route path="/News" element={<News />} />
          <Route path="/Admin" element={<AdminPage/>} />
          <Route path="/profile" element={<UserManagementPage/>} />
          <Route path="/Games/:id" element={<GameDetails/>} />
          <Route path="Upload" element={<GameUploadPage/>} />
          <Route path="change-password" element={<ChangePassword/>} />
        </Routes>
        <LoginRegisterModal
          isOpen={isLoginModalOpen} // Truyền state vào modal
          onRequestClose={() => setIsLoginModalOpen(false)} // Đóng modal
        />
      </div>
      <Footer/>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
