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
import GameUploadPageforDeveloper from './Components/UploadGames/GameUploadPageforDeveloper.jsx';
import GameUploadPageforPublisher from './Components/UploadGames/GameUploadPageforPublisher.jsx';
import ChangePassword from './Components/UserPage/ChangePassword/ChangePassword.jsx';
import Adminsetting from './Components/admindash-main/src/components/Adminsetting/Adminsetting.jsx';
import UserSettinggameforDev from './Components/UserPage/UserSettingGame/UserSettingGameforDev.jsx';
import UserSettinggameforPub from './Components/UserPage/UserSettingGame/UserSettingGameforPub.jsx';
import NotFound404 from './Components/404notfound/NotFound404.jsx';
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State để quản lý modal login
  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          <Header openLoginModal={() => setIsLoginModalOpen(true)} /> {/* Pass function để mở modal */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/support" element={<Support />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<UserManagementPage />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/upload-Dev" element={<GameUploadPageforDeveloper />} />
            <Route path="/upload-Pub" element={<GameUploadPageforPublisher />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/admin/setting" element={<Adminsetting />} />
            <Route path='/developer-setting' element={<UserSettinggameforDev />} />
            <Route path='/publisher-setting' element={<UserSettinggameforPub />} />
            <Route path='/404/notfound' element={<NotFound404 />} />
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
