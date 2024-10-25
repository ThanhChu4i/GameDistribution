import React, { useState } from 'react';
import axios from 'axios';

const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/games/upload', formData);
            setFilePath(response.data.filePath);
            setError('');
            setGameName('');
            setImageFile(null);
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
                    <label>Tên Game:</label>
                    <input 
                        type="text" 
                        value={gameName} 
                        onChange={(e) => setGameName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Chọn Ảnh:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange} 
                        required 
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Đang upload...' : 'Upload'}
                </button>
            </form>
            {filePath && (
                <div>
                    <h3>Đường dẫn tới file đã upload:</h3>
                    <a href={filePath} target="_blank" rel="noopener noreferrer">{filePath}</a>
                </div>
            )}
        </div>
    );
};

export default GameUpload;
