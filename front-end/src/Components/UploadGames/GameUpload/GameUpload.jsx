import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './GameUpload.css';

const GameUpload = () => {
    const [gameName, setGameName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [zipFile, setZipFile] = useState(null);
    const [no_blood, setNo_blood] = useState(false);
    const [description, setDescription] = useState('');
    const [instruction, setInstruction] = useState('');
    const [child_friendly, setChild_friendly] = useState(false);
    const [languages, setLanguages] = useState('');
    const [players, setPlayers] = useState('');
    const [genres, setGenres] = useState('');
    const [ingame_purchases, setIngame_purchases] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = Cookies.get('token');
    const id_user = Cookies.get('id_user');

    const [dropdownOpen, setDropdownOpen] = useState({
        genres: false,
        languages: false,
        players: false,
        mobile: false,
    });

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (file && validImageTypes.includes(file.type)) {
            setImageFile(file);
            setError('');
        } else {
            setError('Chỉ chấp nhận file ảnh có định dạng JPEG, JPG, PNG hoặc GIF!');
        }
    };

    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [dropdown]: !prev[dropdown],
        }));
    };

    const handleZipFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/zip') {
            setZipFile(file);
            setError('');
        } else {
            setError('Chỉ chấp nhận file .zip cho dữ liệu game!');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'genres') setGenres(value);
        else if (name === 'languages') setLanguages(value);
        else if (name === 'players') setPlayers(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gameName || !imageFile || !zipFile) {
            setError('Vui lòng điền đầy đủ thông tin và tải lên cả ảnh và file .zip!');
            return;
        }

        const formData = new FormData();
        formData.append('id_user', id_user);
        formData.append('image', imageFile);
        formData.append('zipFile', zipFile);
        formData.append('name', gameName);
        formData.append('no_blood', no_blood);
        formData.append('description', description);
        formData.append('instruction', instruction);
        formData.append('child_friendly', child_friendly);
        formData.append('ingame_purchases', ingame_purchases);
        formData.append('languages', languages);
        formData.append('genres', genres);
        formData.append('players', players);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/api/games/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage('Tải lên thành công!');
            setError('');
            setGameName('');
            setImageFile(null);
            setZipFile(null);
            setNo_blood(false);
            setDescription('');
            setInstruction('');
            setChild_friendly(false);
            setIngame_purchases(false);
        } catch (error) {
            setError(error.response?.data?.error || 'Có lỗi xảy ra khi upload file.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="game-upload-container">
            <h2>Upload Game</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>No Blood?</label>
                    <input
                        type="checkbox"
                        checked={no_blood}
                        onChange={(e) => setNo_blood(e.target.checked)}
                    />
                </div>
                <div className="form-group">
                    <label>Child Friendly?</label>
                    <input
                        type="checkbox"
                        checked={child_friendly}
                        onChange={(e) => setChild_friendly(e.target.checked)}
                    />
                </div>
                <div className="form-group">
                    <label>Ingame Purchases?</label>
                    <input
                        type="checkbox"
                        checked={ingame_purchases}
                        onChange={(e) => setIngame_purchases(e.target.checked)}
                    />
                </div>
                <div className="form-group">
                    <label>Chọn Ảnh:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        required
                    />
                </div>
                <div className="filter-options">
                    {/* Dropdown Genres */}
                    <div className="dropdown">
                        <button type="button" className="dropdown-button" onClick={() => toggleDropdown('genres')}>
                            Genres
                        </button>
                        {dropdownOpen.genres && (
                            <select name="genres" value={genres} onChange={handleFilterChange}>
                                <option value="">All Genres</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="strategy">Strategy</option>
                            </select>
                        )}
                    </div>

                    {/* Dropdown Languages */}
                    <div className="dropdown">
                        <button type="button" className="dropdown-button" onClick={() => toggleDropdown('languages')}>
                            Languages
                        </button>
                        {dropdownOpen.languages && (
                            <select name="languages" value={languages} onChange={handleFilterChange}>
                                <option value="">All Languages</option>
                                <option value="vietnamese">Vietnamese</option>
                                <option value="japanese">Japanese</option>
                                <option value="korean">Korean</option>
                                <option value="english">English</option>
                            </select>
                        )}
                    </div>

                    {/* Dropdown Players */}
                    <div className="dropdown">
                        <button type="button" className="dropdown-button" onClick={() => toggleDropdown('players')}>
                            Players
                        </button>
                        {dropdownOpen.players && (
                            <select name="players" value={players} onChange={handleFilterChange}>
                                <option value="">All Players</option>
                                <option value="single">Single Player</option>
                                <option value="multi">Multiplayer</option>
                                <option value="coop">Co-op</option>
                            </select>
                        )}
                    </div>

                    {/* Dropdown Mobile Compatible */}
                    <div className="dropdown">
                        <button type="button" className="dropdown-button" onClick={() => toggleDropdown('mobile')}>
                            Mobile Compatible
                        </button>
                        {dropdownOpen.mobile && (
                            <select name="mobile" value={''} onChange={handleFilterChange}>
                                <option value="">All Compatibility</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label>Chọn file .zip cho dữ liệu game:</label>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={handleZipFileChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Instruction:</label>
                    <input
                        type="text"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
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
