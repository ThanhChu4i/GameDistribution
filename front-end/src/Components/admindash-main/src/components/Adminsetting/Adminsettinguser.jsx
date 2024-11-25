import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import avatardefault from '../../../../Assets/avatar_default.webp'
import './Adminsetting.css';
import { Link } from "react-router-dom";

const AdminSettinguser = () => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [lockedUsers, setLockedUsers] = useState([]);
  const [wtdevUsers, setwtdevUsers] = useState([]);
  const [wtpubUsers, setwtpubUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null); // State for delete confirmation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/settinguser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
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
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const active = users.filter(user => user.isActive);
    const locked = users.filter(user => !user.isActive);
    const wanttodev = users.filter(user => user.wanttodev);
    const wanttopub = users.filter(user => user.wanttopub);
    setActiveUsers(active);
    setLockedUsers(locked);
    setwtdevUsers(wanttodev);
    setwtpubUsers(wanttopub);
  }, [users]);

  const openEditModal = (user) => {
    setEditUser(user);
  };

  const closeEditModal = () => {
    setEditUser(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/settinguser/${editUser._id}`, editUser, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.map(u => u._id === editUser._id ? response.data : u));
      closeEditModal();
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/settinguser/${deleteUserId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter(u => u._id !== deleteUserId));
      closeDeleteModal();
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
  };

  const closeDeleteModal = () => {
    setDeleteUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-settings-container">
      <button className="backtoadmin"><Link to="/Admin">Back</Link></button>
      <h1>Admin Settings User</h1>
      {users.length > 0 ? (
        <div className="userd">
          <h2>Users want to Developer</h2>
          <div className="users-list">
            {wtdevUsers.map((u) => (
              <div key={u._id} className="user-card">
                <img
                    src={u.avatarPath || avatardefault}  // Use custom avatar or default
                    alt="User Avatar"
                    className="user-avatar"
                  />
                <p>First name: {u.first_name}</p>
                <p>Last name: {u.last_name}</p>
                <p>Email: {u.email}</p>
                <p>Country: {u.country}</p>
                <p>Company: {u.company}</p>
                <p>Created_at: {u.created_in}</p>
                <p>Update_at: {u.update_in}</p>
                <p>Developer? : {u.developer ? "Yes" : "No"} </p>
                <p>Publisher? : {u.publisher ? "Yes" : "No"} </p>
                <p>Active? : {u.isActive ? "Yes" : "No"} </p>
                <button onClick={() => openEditModal(u)}>Edit</button>
                <button className="delete-btn" onClick={() => openDeleteModal(u._id)}>Delete</button>
              </div>
            ))}
          </div>
          <h2>Users want to Publisher</h2>
          <div className="users-list">
            {wtpubUsers.map((u) => (
              <div key={u._id} className="user-card">
                <img
                    src={u.avatarPath || avatardefault}  // Use custom avatar or default
                    alt="User Avatar"
                    className="user-avatar"
                  />
                <p>First name: {u.first_name}</p>
                <p>Last name: {u.last_name}</p>
                <p>Email: {u.email}</p>
                <p>Country: {u.country}</p>
                <p>Company: {u.company}</p>
                <p>Created_at: {u.created_in}</p>
                <p>Update_at: {u.update_in}</p>
                <p>Developer? : {u.developer ? "Yes" : "No"} </p>
                <p>Publisher? : {u.publisher ? "Yes" : "No"} </p>
                <p>Active? : {u.isActive ? "Yes" : "No"} </p>
                <button onClick={() => openEditModal(u)}>Edit</button>
                <button className="delete-btn" onClick={() => openDeleteModal(u._id)}>Delete</button>
              </div>
            ))}
          </div>
          <h2>Users Active</h2>
          <div className="users-list">
            {activeUsers.map((u) => (
              <div key={u._id} className="user-card">
                <img
                    src={u.avatarPath || avatardefault}  // Use custom avatar or default
                    alt="User Avatar"
                    className="user-avatar"
                  />
                <p>First name: {u.first_name}</p>
                <p>Last name: {u.last_name}</p>
                <p>Email: {u.email}</p>
                <p>Country: {u.country}</p>
                <p>Company: {u.company}</p>
                <p>Created_at: {u.created_in}</p>
                <p>Update_at: {u.update_in}</p>
                <p>Developer? : {u.developer ? "Yes" : "No"} </p>
                <p>Publisher? : {u.publisher ? "Yes" : "No"} </p>
                <p>Active? : {u.isActive ? "Yes" : "No"} </p>
                <button onClick={() => openEditModal(u)}>Edit</button>
                <button className="delete-btn" onClick={() => openDeleteModal(u._id)}>Delete</button>
              </div>
            ))}
          </div>
          <h2>Users Locked</h2>
          <div className="users-list">
            {lockedUsers.map((u) => (
              <div key={u._id} className="user-card">
                  <img
                    src={u.avatarPath || avatardefault}  // Use custom avatar or default
                    alt="User Avatar"
                    className="user-avatar"
                  />
                <p>First name: {u.first_name}</p>
                <p>Last name: {u.last_name}</p>
                <p>Email: {u.email}</p>
                <p>Country: {u.country}</p>
                <p>Company: {u.company}</p>
                <p>Created_at: {u.created_in}</p>
                <p>Update_at: {u.update_in}</p>
                <p>Developer? : {u.developer ? "Yes" : "No"} </p>
                <p>Publisher? : {u.publisher ? "Yes" : "No"} </p>
                <p>Active? : {u.isActive ? "Yes" : "No"} </p>
                <button onClick={() => openEditModal(u)}>Edit</button>
                <button className="delete-btn" onClick={() => openDeleteModal(u._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-users-message">No users found.</p>
      )}

      {editUser && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h2>Edit User</h2>
            <label>First Name</label>
            <input type="text" name="first_name" value={editUser.first_name || ""} onChange={handleInputChange} />

            <label>Last Name</label>
            <input type="text" name="last_name" value={editUser.last_name || ""} onChange={handleInputChange} />

            <label>Email</label>
            <input type="email" name="email" value={editUser.email || ""} onChange={handleInputChange} />

            <label>Country</label>
            <input type="text" name="country" value={editUser.country || ""} onChange={handleInputChange} />

            <label>Company</label>
            <input type="text" name="company" value={editUser.company || ""} onChange={handleInputChange} />

            <label>Developer</label>
            <input type="checkbox" name="developer" checked={editUser.developer} onChange={handleInputChange} />

            <label>Publisher</label>
            <input type="checkbox" name="publisher" checked={editUser.publisher} onChange={handleInputChange} />

            <label>Active</label>
            <input type="checkbox" name="isActive" checked={editUser.isActive} onChange={handleInputChange} />

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeEditModal}>Cancel</button>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>

      )}

      {deleteUserId && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h2>Are you sure you want to delete this user?</h2>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeDeleteModal}>No</button>
              <button className="delete-btn" onClick={handleDeleteUser}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettinguser;
