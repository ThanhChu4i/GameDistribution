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
import ChangePassword from './Components/UserPage/ChangePassword/ChangePassword.jsx';
import Adminsettinguser from './Components/admindash-main/src/components/Adminsetting/Adminsettinguser.jsx';
import AdminSettinggame from './Components/admindash-main/src/components/Adminsetting/Adminsettinggame.jsx';
import UserSettinggame from './Components/UserPage/UserSettingGame/UserSettingGame.jsx';
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
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/profile" element={<UserManagementPage/>} />
          <Route path="/games/:id" element={<GameDetails/>} />
          <Route path="/upload" element={<GameUploadPage/>} />
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path='/admin/setting/user' element={<Adminsettinguser/>} />
          <Route path='/admin/setting/game' element={<AdminSettinggame/>} />
          <Route path='/user/setting/game' element= {<UserSettinggame/>} />
          <Route path='/404/notfound'  element= {<NotFound404/>} />
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
