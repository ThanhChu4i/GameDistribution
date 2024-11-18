import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Kiểm tra cookie khi khởi tạo để xác định trạng thái đăng nhập
    const token = Cookies.get('token');
    return token ? true : false;
  });
  
  const [avatarUser, setAvatarUser] = useState(() => {
    // Lấy avatar từ cookie khi khởi tạo
    return Cookies.get('avatar') || null;
  });

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const login = (token, avatar) => {
    // Lưu token và avatar vào cookie khi đăng nhập
    Cookies.set('token', token, { expires: 2 / 24 });
    Cookies.set('avatar', avatar, { expires: 2 / 24 });
    setAvatarUser(avatar); // Cập nhật avatar trong state
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
  };

  const logout = () => {
    // Xóa cookie token và avatar khi đăng xuất
    Cookies.remove('token');
    Cookies.remove('avatar');
    setIsLoggedIn(false);
    setAvatarUser(null); // Cập nhật trạng thái đăng xuất
    navigate('/'); // Điều hướng về trang chính sau khi đăng xuất
  };

  const onAvatarChange = (newAvatar) => {
    // Cập nhật avatar mới vào cookie và state
    Cookies.set('avatar', newAvatar, { expires: 2 / 24});
    setAvatarUser(newAvatar);
  };

  useEffect(() => {
    // Kiểm tra lại trạng thái đăng nhập nếu cookie thay đổi
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // Cập nhật trạng thái nếu token tồn tại
  }, []);

  return (
    <AuthContext.Provider value={{ avatarUser, isLoggedIn, login, logout, onAvatarChange }}>
      {children}
    </AuthContext.Provider>
  );
};
