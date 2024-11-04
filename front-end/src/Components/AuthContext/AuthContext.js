import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để điều hướng

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => { 
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Kiểm tra cookie khi khởi tạo để xác định trạng thái đăng nhập
    const token = Cookies.get('token');
    return token ? true : false;
  });

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const login = (token) => {
    // Lưu token vào cookie khi đăng nhập
    Cookies.set('token', token, { expires: 2 }); // Lưu token trong 2 ngày
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
  };

  const logout = () => {
    // Xóa cookie token khi đăng xuất
    Cookies.remove('token');
    setIsLoggedIn(false); // Cập nhật trạng thái đăng xuất
    navigate('/'); // Điều hướng về trang chính sau khi đăng xuất
  };

  useEffect(() => {
    // Kiểm tra lại trạng thái đăng nhập nếu cookie thay đổi
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // Cập nhật trạng thái nếu token tồn tại
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
