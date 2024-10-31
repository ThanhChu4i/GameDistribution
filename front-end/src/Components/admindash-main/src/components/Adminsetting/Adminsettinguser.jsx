import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Adminsetting.css';

const AdminSettinguser = () => {
  const [users, setUsers] = useState([]);
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
        const response = await axios.get('http://localhost:8081/admin/settinguser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
        if (err.response && err.response.status === 401) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleEditUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8081/admin/settinguser/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.map(u => u._id === userId ? response.data : u));
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/settinguser/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter(u => u._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-settings-container">
      <h1>Admin Settings User</h1>
      {users.length > 0 ? (
        <div className="users-list">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              <p>First name: {u.first_name}</p>
              <p>Last name: {u.last_name}</p>  
              <p>Email: {u.email}</p>
              <p>Country: {u.country}</p>
              <p>Company:{u.company}</p>
              <p>Created_at:{u.created_in}</p>
              <p>Update_at:{u.update_in}</p>
              <button onClick={() => handleEditUser(u._id, { name: "New Name" })}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users-message">No users found.</p>
      )}
    </div>
  );
};

export default AdminSettinguser;
