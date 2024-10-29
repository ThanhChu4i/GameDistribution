import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import imageCompression from 'browser-image-compression';
const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [no_blood, setNo_blood] = useState(false);
    const [child_friendly, setChild_friendly] = useState(false);
    const [ingame_purchases, setIngame_purchases] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = Cookies.get('token');
    const id_user = Cookies.get('id_user');

    // Xử lý thay đổi ảnh
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const validExtensions = ['.jpeg', '.jpg', '.png', '.gif'];

        // Kiểm tra loại file
        if (file) {
            const isValidType = validImageTypes.includes(file.type);
            const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
            const isValidExtension = validExtensions.includes(`.${fileExtension.toLowerCase()}`);

            if (isValidType && isValidExtension) {
                setImageFile(file);
                setError('');
            } else {
                setError('Chỉ chấp nhận file ảnh có định dạng JPEG, JPG, PNG hoặc GIF!');
            }
        } else {
            setError('Chưa chọn file ảnh!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameName || !imageFile) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        const options = {
            maxSizeMB: 1, // Giới hạn kích thước tối đa của file (1MB)
            maxWidthOrHeight: 1024, // Giới hạn chiều rộng hoặc chiều cao tối đa
            useWebWorker: true // Sử dụng Web Worker để xử lý
        };
        const compressedFile = await imageCompression(imageFile, options);
        const formData = new FormData();
        formData.append('id_user', id_user);
        formData.append('image', compressedFile);
        formData.append('name', gameName);
        formData.append('no_blood', no_blood);
        formData.append('child_friendly', child_friendly);
        formData.append('ingame_purchases', ingame_purchases);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/games/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Xử lý phản hồi từ server
            setSuccessMessage('Tải lên thành công!');
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
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
