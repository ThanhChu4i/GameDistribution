import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AvatarUpload = ({ currentAvatar, onAvatarChange }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(currentAvatar);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // To display success message

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
      setError(null); // Clear any previous error
    }
  };

  const handleSaveAvatar = async () => {
    if (!avatar) {
      setError('Vui lòng chọn một ảnh để tải lên.');
      return;
    }
    
    try {
      const token = Cookies.get('token');
      const data = new FormData();
      data.append('avatar', avatar);
  
      // Adjusting the method (POST or PUT)
      const response = await axios.put('http://localhost:8081/user/userData/updateavatar', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      // Console log to check response
      console.log("Response from server:", response);
  
      if (response.status === 200) {
        onAvatarChange(response.data.avatarPath);
        setPreview(response.data.avatarPath);
        setError(null);
        setSuccessMessage('Avatar updated successfully!');  // Display success message
      } else {
        setError('Failed to upload avatar. Please try again later.');
      }
    }  catch (err) {
        setError(err.response?.data?.error || 'Có lỗi xảy ra khi upload file.');
        console.error(error);
    } 
  };

  return (
    <div className="avatar-section">
      <img src={preview} alt="Avatar preview" className="avatar-preview" />
      <input type="file" accept="image/*" onChange={handleAvatarChange} />
      <button onClick={handleSaveAvatar}>Upload Avatar</button>
      
      {/* Success and error messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AvatarUpload;
