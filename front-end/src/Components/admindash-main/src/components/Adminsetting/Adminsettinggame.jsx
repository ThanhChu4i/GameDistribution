import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './AdminsettingGame.css';

const AdminSettingGame = () => {
  const [games, setGames] = useState([]);
  const [activeGames, setActiveGames] = useState([]);
  const [lockedGames, setLockedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGameId, setEditingGameId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [deleteGameId, setDeleteGameId] = useState(null);
  const [updatedData, setUpdatedData] = useState({ game_name: '', game_description: '', instruction: '', isActive: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/settinggame`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGames(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate('/404/Notfound');
      }
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [navigate]);
  
  useEffect(() => {
    const active = games.filter(game => game.isActive);
    const locked = games.filter(game => !game.isActive);

    setActiveGames(active);
    setLockedGames(locked);
  }, [games]);

  const startEditingGame = (game) => {
    setEditingGameId(game._id);
    setUpdatedData({ game_name: game.game_name, game_description: game.game_description, instruction: game.instruction, isActive: game.isActive });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleEditGame = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/updategame/${editingGameId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setGames((prevGames) => prevGames.map(game => game._id === editingGameId ? response.data : game));
      alert("Game updated successfully!");
      setEditingGameId(null);
    } catch (err) {
      console.error("Error updating game:", err);
      alert("Failed to update game");
    }
  };

  const handleDeleteGame = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/settinggame/${deleteGameId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setGames((prevGames) => prevGames.filter(game => game._id !== deleteGameId));
      alert("Game deleted successfully!");
      setShowDeleteModal(false); // Close the modal after delete
      setDeleteGameId(null);
    } catch (err) {
      console.error("Error deleting game:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate('/404/Notfound');
      }
      alert("Failed to delete game");
    }
  };

  const confirmDeleteGame = (gameId) => {
    setShowDeleteModal(true); // Show the delete confirmation modal
    setDeleteGameId(gameId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-settings-container">
      <button className="backtoadmin"><Link to = "/Admin">Back</Link></button>
      <h1>Admin Settings Game</h1>
      {games.length > 0 ? (
        <div className= "full-listtf">
          <h2>Game Active</h2>
          <div className="game-listtf">
            {activeGames.map((game) => (
              <div key={game._id} className="game-cardtf">
                <p>{game.game_name}</p>
                <img className="game-avatar" src={game.imagePath} alt="Game" />
                <button className="edit-button" onClick={() => startEditingGame(game)}>Edit</button>
                <button className="delete-button" onClick={() => confirmDeleteGame(game._id)}>Delete</button>
              </div>
            ))}
          </div>
          <h2>Game Locked</h2>
          <div className="game-listtf">
            {lockedGames.map((game) => (
              <div key={game._id} className="game-cardtf">
                <p>{game.game_name}</p>
                <img className="game-avatar" src={game.imagePath} alt="Game" />
                <button className="edit-button" onClick={() => startEditingGame(game)}>Edit</button>
                <button className="delete-button" onClick={() => confirmDeleteGame(game._id)}>Delete</button>
              </div>
            ))}
          </div>
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

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this game?</p>
            <button className="save-button" onClick={handleDeleteGame}>Yes, Delete</button>
            <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingGame;
