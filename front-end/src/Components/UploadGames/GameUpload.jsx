// GameUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [no_blood, setNo_blood] = useState(false);
    const [child_friendly, setChild_friendly] = useState(false);
    const [ingame_purchases, setIngame_purchases] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token'); // Token riêng cho upload

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setError('');
        } else {
            setError('Chỉ chấp nhận file ảnh!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameName || !imageFile) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', gameName);
        formData.append('no_blood', no_blood);
        formData.append('child_friendly', child_friendly);
        formData.append('ingame_purchases', ingame_purchases);

        setLoading(true);
        
        try {
            await axios.post('http://localhost:8081/api/games/upload', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setError('');
            setGameName('');
            setImageFile(null);
            setNo_blood(false);
            setChild_friendly(false);
            setIngame_purchases(false);
        } catch (error) {
            setError('Có lỗi xảy ra khi upload file.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload Game</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} required />
                </div>
                <div>
                    <label>No Blood ?:</label>
                    <input type="checkbox" checked={no_blood} onChange={(e) => setNo_blood(e.target.checked)} />
                </div>
                <div>
                    <label>Child Friendly ?:</label>
                    <input type="checkbox" checked={child_friendly} onChange={(e) => setChild_friendly(e.target.checked)} />
                </div>
                <div>
                    <label>Ingame Purchases ?:</label>
                    <input type="checkbox" checked={ingame_purchases} onChange={(e) => setIngame_purchases(e.target.checked)} />
                </div>
                <div>
                    <label>Choose Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageFileChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default GameUpload;
