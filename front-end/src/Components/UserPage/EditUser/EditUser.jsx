import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = ({ onEdit }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://localhost:8081/user/userData', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
        setFormData(response.data);
        setPreview(response.data.avatar);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again later.');
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      const response = await axios.put('http://localhost:8081/user/uploadavatar', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      setUser((prev) => ({ ...prev, avatar: response.data.avatarPath }));
      alert('Avatar updated successfully!');
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar. Please try again later.');
    }
  };

  const handleSaveUserData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put('http://localhost:8081/user/updateUser', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setIsEditing(false);
      navigate('/profile');
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data. Please try again later.');
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="view-user-container">
      {isEditing ? (
        <div className="user-info">
          <h2>Edit User Details</h2>
          <div className="avatar-section">
            <img src={preview} alt="Avatar preview" className="avatar-preview" />
            <input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} />
            <button onClick={handleSaveAvatar}>Upload Avatar</button>
          </div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </label>
          <label>
            First Name:
            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
          </label>
          <label>
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
          </label>
          <div className="action-buttons">
            <button className="save-button" onClick={handleSaveUserData}>Save</button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="user-info">
          <h2>User Details</h2>
          <img src={user.avatar} alt="Avatar" className="avatar-display" />
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.first_name || 'Not provided'}</p>
          <p><strong>Last Name:</strong> {user.last_name || 'Not provided'}</p>
          <p><strong>Country:</strong> {user.country || 'Not provided'}</p>
          <p><strong>Company:</strong> {user.company || 'Not provided'}</p>
          <p><strong>Created in:</strong> {user.created_in}</p>
          <p><strong>Updated in:</strong> {user.update_in}</p>
          <div className='action-buttons'>
            <button className="action-buttons" onClick={() => setIsEditing(true)}>Change Information</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
