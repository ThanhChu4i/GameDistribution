import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AvatarUpload = ({ currentAvatar, onAvatarChange }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(currentAvatar);
  const [error, setError] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveAvatar = async () => {
    if (!avatar) return;
    try {
      const token = Cookies.get('token');
      const data = new FormData();
      data.append('avatar', avatar);

      const response = await axios.post('http://localhost:8081/user/userData/updateavatar', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      // Thông báo và cập nhật ảnh mới
      onAvatarChange(response.data.avatarPath);
      alert('Avatar updated successfully!');
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar. Please try again later.');
    }
  };

  return (
    <div className="avatar-section">
      <img src={preview} alt="Avatar preview" className="avatar-preview" />
      <input type="file" accept="image/*" onChange={handleAvatarChange} />
      <button onClick={handleSaveAvatar}>Upload Avatar</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AvatarUpload;
