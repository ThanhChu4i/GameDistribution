import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const AvatarUpload = ({ currentAvatar }) => {
    const { avatarUser, onAvatarChange } = useContext(AuthContext);

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(currentAvatar || avatarUser);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (avatarUser) {
            setPreview(avatarUser);
        }
    }, [avatarUser]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must not exceed 5MB.');
                return;
            }

            setAvatar(file);
            setPreview(URL.createObjectURL(file));
            setError(null);
        }
    };

    const handleSaveAvatar = async () => {
        if (!avatar) {
            setError('Please select an image to upload.');
            return;
        }

        try {
            const token = Cookies.get('token');
            const data = new FormData();
            data.append('avatar', avatar);

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/user/userData/updateavatar`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                const avatarPath = `${response.data.avatarPath}`; // Thêm URL đầy đủ
                onAvatarChange(avatarPath); // Cập nhật avatar trong context
                setPreview(avatarPath);
                setError(null);
                alert('Avatar uploaded successfully!');
                setSuccessMessage('Avatar uploaded successfully!');
            } else {
                setError('Failed to upload avatar. Please try again.');
                alert('Failed to upload avatar. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred while uploading the avatar.');
        }
    };

    return (
        <div className="avatar-section">
            <h2>Avatar</h2>
            <img
                src={preview}
                alt="Avatar-preview"
                className="avatar-preview"
                onError={(e) => (e.target.src = '/default-avatar.jpg')}
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <button onClick={handleSaveAvatar}>Upload Avatar</button>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AvatarUpload;
