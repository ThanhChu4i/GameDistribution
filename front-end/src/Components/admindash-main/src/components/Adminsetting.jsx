import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminSetting = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8081/admin/setting', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
        if (err.response && err.response.status === 401) {
          navigate('/'); // Redirect if unauthorized
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEditUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8081/admin/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUser((prevUser) => prevUser.map(u => u.id === userId ? response.data : u));
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUser((prevUser) => prevUser.filter(u => u.id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Settings</h1>
      {user ? (
        <div>
          <h2>Users</h2>
          <ul>
            {user.map((u) => (
              <li key={u.id}>
                <p>Name: {u.name}</p>
                <p>Email: {u.email}</p>
                <button onClick={() => handleEditUser(u.id, { name: "New Name" })}>Edit</button>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminSetting;
