// ChangePassword.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../../AuthContext/AuthContext'; // Nhập AuthContext
import './ChangePassword.css'
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const { logout } = useContext(AuthContext); // Lấy hàm logout từ AuthContext

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu mới và xác nhận có khớp không
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    const token = Cookies.get('token');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Xử lý phản hồi thành công
      setSuccess(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);

      // Đăng xuất người dùng
      logout(); // Gọi hàm logout sau khi đổi mật khẩu thành công
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response ? err.response.data.message : 'Failed to update password. Please try again later.');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="codae"type="submit">Change Password</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && (
        <div style={{ color: 'green' }}>
          {success}
          <p>Please log in again</p>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
