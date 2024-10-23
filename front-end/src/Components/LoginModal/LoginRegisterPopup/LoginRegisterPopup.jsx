import React, { useState } from 'react';
import Modal from 'react-modal';
import './LoginRegisterPopup.css';
import LoginPopup from '../Login/Login.jsx';
import SignupPopup from '../Signup/Signup.jsx';

Modal.setAppElement('#root'); // Thiết lập app element

const LoginRegisterPopup = ({ isOpen, onRequestClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    onRequestClose();
    setIsLogin(true); // Đặt lại trạng thái về đăng nhập khi đóng modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-popup"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <div
          className={`tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </div>
        <div
          className={`tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Registration
        </div>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        {isLogin ? (
          <LoginPopup onRequestClose={handleClose} />
        ) : (
          <SignupPopup onRequestClose={handleClose} />
        )}
      </div>
    </Modal>
  );
};

export default LoginRegisterPopup;
