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
    return Cookies.get('avatar') || null; // Lấy avatar từ cookie
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return Cookies.get('isAdmin') === 'true'; // Ép kiểu từ cookie về boolean
  });
  const [isDevPub, setIsDevPub] = useState(() => {
    return Cookies.get('isDevPub') === 'true'; // Ép kiểu từ cookie về boolean
  });

  const navigate = useNavigate();

  const login = (token, avatar, isAdmin, isDevPub) => {
    Cookies.set('token', token, { expires: 2 / 24 });
    Cookies.set('avatar', avatar, { expires: 2 / 24 });
    Cookies.set('isAdmin', isAdmin ? 'true' : 'false', { expires: 2 / 24 });
    Cookies.set('isDevPub', isDevPub ? 'true' : 'false', { expires: 2 / 24 });

    setAvatarUser(avatar);
    setIsAdmin(!!isAdmin); // Cập nhật state
    setIsDevPub(!!isDevPub);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('avatar');
    Cookies.remove('isAdmin');
    Cookies.remove('isDevPub');

    setIsLoggedIn(false);
    setAvatarUser(null);
    setIsAdmin(false);
    setIsDevPub(false);

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
    setIsDevPub(Cookies.get('isDevPub') === 'true'); // Cập nhật trạng thái Dev/Pub
  }, []);

  return (
    <AuthContext.Provider
      value={{
        avatarUser,
        isLoggedIn,
        isAdmin,
        isDevPub,
        login,
        logout,
        onAvatarChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
