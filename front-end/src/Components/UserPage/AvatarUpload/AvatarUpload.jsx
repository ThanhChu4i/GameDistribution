import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext'; // Import AuthContext
import axios from 'axios';
import Cookies from 'js-cookie';

const AvatarUpload = ({ currentAvatar }) => {
    const { avatarUser, onAvatarChange } = useContext(AuthContext); // Correctly use useContext inside the component

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(currentAvatar || avatarUser); // Initialize preview
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
            // Check file size before setting it
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
                'http://localhost:8081/user/userData/updateavatar',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (response.status === 200) {
                onAvatarChange(response.data.avatarPath); // Update avatar in context and cookie
                setPreview(response.data.avatarPath); // Update preview
                setError(null);
                setSuccessMessage('Avatar uploaded successfully!');
            } else {
                setError('Failed to upload avatar. Please try again.');
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.error || 'An error occurred while uploading the avatar.');
            console.error('Upload error:', err);
        }
    };

    return (
        <div className="avatar-section">
            <h2>Avatar</h2>
            <img
                src={preview}
                alt="Avatar-preview"
                className="avatar-preview"
                onError={(e) => (e.target.src = '/default-avatar.jpg')} // Fallback to default avatar
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <button onClick={handleSaveAvatar}>Upload Avatar</button>

            {/* Success and error messages */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AvatarUpload;
