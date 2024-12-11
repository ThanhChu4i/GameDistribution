import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = Cookies.get('token');
    return !!token; // Xác định trạng thái đăng nhập
  });
  const [avatarUser, setAvatarUser] = useState(() => {
    return Cookies.get('avatar')|| null; // Lấy avatar từ cookie
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return Cookies.get('isAdmin') === 'true'; // Ép kiểu từ cookie về boolean
  });
  const [isDeveloper, setIsDeveloper] = useState(() => {
    return Cookies.get('developer') === 'true'; // Ép kiểu từ cookie về boolean
  });
  const [isPublisher, setIsPublisher] = useState(() => {
    return Cookies.get('publisher') === 'true'; // Ép kiểu từ cookie về boolean
  });
  const navigate = useNavigate();
  const login = (token, avatar, isAdmin, developer, publisher) => {
    Cookies.set('token', token, { expires: 2 / 24 });
    Cookies.set('avatar', `${avatar}`, { expires: 2 / 24 });
    Cookies.set('isAdmin', isAdmin ? 'true' : 'false', { expires: 2 / 24 });
    Cookies.set('developer', developer ? 'true' : 'false', { expires: 2 / 24 });
    Cookies.set('publisher', publisher ? 'true' : 'false', { expires: 2 / 24 });
    setAvatarUser(avatar);
    setIsAdmin(!!isAdmin); // Cập nhật state
    setIsDeveloper(!!developer);
    setIsPublisher(!!publisher);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('avatar');
    Cookies.remove('isAdmin');
    Cookies.remove('developer');
    Cookies.remove('publisher');

    setIsLoggedIn(false);
    setAvatarUser(null);
    setIsAdmin(false);
    setIsDeveloper(false);
    setIsPublisher(false);

    navigate('/'); // Điều hướng về trang chính sau khi đăng xuất
  };

  const onAvatarChange = (newAvatar) => {
    Cookies.set('avatar', newAvatar, { expires: 2 / 24 });
    setAvatarUser(newAvatar); // Cập nhật avatar trong state
  };

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // Xác định trạng thái đăng nhập từ token
    setIsAdmin(Cookies.get('isAdmin') === 'true'); // Cập nhật trạng thái Admin
    setIsDeveloper(Cookies.get('developer') === 'true');
    setIsPublisher(Cookies.get('publisher') === 'true'); // Cập nhật trạng thái Dev/Pub
  }, []);

  return (
    <AuthContext.Provider
      value={{
        avatarUser,
        isLoggedIn,
        isAdmin,
        isDeveloper,
        isPublisher,
        login,
        logout,
        onAvatarChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
