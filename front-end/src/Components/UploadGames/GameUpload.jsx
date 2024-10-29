import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [no_blood, setNo_blood] = useState(false);
    const [child_friendly, setChild_friendly] = useState(false);
    const [ingame_purchases, setIngame_purchases] = useState(false);
    const [relativeFilePath, setRelativeFilePath] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');
    const id_user = Cookies.get('id_user');

    // Xử lý thay đổi ảnh
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileName = `${Date.now()}_${file.name}`;
                const filePath = `/images/${fileName}`;
                setRelativeFilePath(filePath);

                // Lưu file vào public/images bằng cách tạo blob object từ data URL (base64)
                const blob = new Blob([reader.result], { type: file.type });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filePath;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            reader.readAsDataURL(file);
            setError('');
        } else {
            setError('Chỉ chấp nhận file ảnh!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameName || !relativeFilePath) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/games/upload', {
                id_user,
                name: gameName,
                no_blood,
                child_friendly,
                ingame_purchases,
                imagePath: relativeFilePath,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
            setError('');
            setGameName('');
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
                    <input 
                        type="text" 
                        value={gameName} 
                        onChange={(e) => setGameName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>No_Blood ?:</label>
                    <input 
                        type="checkbox" 
                        checked={no_blood} 
                        onChange={(e) => setNo_blood(e.target.checked)} 
                    />
                </div>
                <div>
                    <label>Child Friendly ?:</label>
                    <input 
                        type="checkbox" 
                        checked={child_friendly} 
                        onChange={(e) => setChild_friendly(e.target.checked)} 
                    />
                </div>
                <div>
                    <label>Ingame Purchases ?:</label>
                    <input 
                        type="checkbox" 
                        checked={ingame_purchases} 
                        onChange={(e) => setIngame_purchases(e.target.checked)} 
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
        </div>
    );
};

export default GameUpload;
