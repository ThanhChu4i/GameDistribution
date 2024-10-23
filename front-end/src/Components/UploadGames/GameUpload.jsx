// front-end/src/GameUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const [error, setError] = useState('');

    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameName || !imageFile) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', gameName); // Thêm tên game vào formData

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFilePath(response.data.filePath);
            setError('');
            // Reset fields after submit if necessary
            setGameName('');
            setImageFile(null);
        } catch (error) {
            setError('Có lỗi xảy ra khi upload file.');
            console.error(error);
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
                <button type="submit">Upload</button>
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
