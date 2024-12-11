import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import './UserSettingGame.css';

const UserSettinggameforPub = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGameId, setEditingGameId] = useState(null);
  const [updatedData, setUpdatedData] = useState({ game_name: '', game_description: '', instruction: '', isActive: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/dev/mygame`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGames(response.data);
      } catch (err) {
        console.error('Error fetching game data:', err);
        setError('Failed to fetch game data');
        if (err.response && err.response.status === 401) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [navigate]);

  const openEditModal = (game) => {
    setEditingGameId(game._id);
    setUpdatedData({
      game_name: game.game_name,
      game_description: game.game_description,
      instruction: game.instruction,
      isActive: game.isActive
    });
  };

  const handleEditGame = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/dev/updategame/${editingGameId}`, updatedData, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      setGames((prevGames) => prevGames.map(game => game._id === editingGameId ? response.data : game));
      alert("Game updated successfully!");
      setEditingGameId(null); // Close modal after save
    } catch (err) {
      console.error("Error updating game:", err);
      alert("Failed to update game");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDeleteGame = async (gameId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/dev/deletegame/${gameId}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      setGames((prevGames) => prevGames.filter(game => game._id !== gameId));
      alert("Game deleted successfully!");
    } catch (err) {
      console.error("Error deleting game:", err);
      alert("Failed to delete game");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-settings-container">
      <Link to='/upload-Pup'><button className="backtouser">Back</button></Link>
      <h1>Publisher Settings Game</h1>
      {games.length > 0 ? (
        <div className="users-lista">
          {games.map((game) => (
            <div key={game._id} className="user-carda">
              <p>{game.game_name}</p>
              <img className="avtgame" src={game.imagePath} alt='Game' />
              <div className="button-container">
                <button onClick={() => openEditModal(game)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteGame(game._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-games-message">No games found.</p>
      )}
      
      {editingGameId && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Game</h2>
            <label>Name</label>
            <input
              type="text"
              name="game_name"
              value={updatedData.game_name}
              onChange={handleInputChange}
              placeholder="Game Name"
            />
            <label>Description</label>
            <input
              type="text"
              name="game_description"
              value={updatedData.game_description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <label>Instruction</label>
            <input
              type="text"
              name="instruction"
              value={updatedData.instruction}
              onChange={handleInputChange}
              placeholder="Instruction"
            />
            <label>Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={updatedData.isActive}
              onChange={handleInputChange}
            />
            <button className="save-button" onClick={handleEditGame}>Save</button>
            <button className="cancel-button" onClick={() => setEditingGameId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettinggameforPub;
