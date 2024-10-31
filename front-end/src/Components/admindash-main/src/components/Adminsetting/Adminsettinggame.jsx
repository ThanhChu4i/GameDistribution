import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Adminsetting.css';

const AdminSettinggame = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8081/admin/settinggame', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handleEditGame = async (gameId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8081/admin/settinggame/${gameId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setGames((prevGames) => prevGames.map(u => u._id === gameId ? response.data : u));
      alert("Game updated successfully!");
    } catch (err) {
      console.error("Error updating game:", err);
      alert("Failed to update game");
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/settinggame/${gameId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setGames((prevGames) => prevGames.filter(u => u._id !== gameId));
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
      <h1>Admin Settings Game</h1>
      {games.length > 0 ? (
        <div className="users-list">
          {games.map((u) => (
            <div key={u._id} className="user-card">
              <p> {u.game_name}</p>
              <img className = "avtgame" src = {u.imagePath} alt='none'/>
              <button onClick={() => handleEditGame(u._id, { name: "New Name" })}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteGame(u._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-games-message">No games found.</p>
      )}
    </div>
  );
};

export default AdminSettinggame;
