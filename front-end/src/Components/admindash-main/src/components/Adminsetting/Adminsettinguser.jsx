import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
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
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [value, setValue] = React.useState(0);// State for delete confirmation
  const navigate = useNavigate();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="admin-settings-container">
      {users.length > 0 ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Users want to Developer" {...a11yProps(0)} />
              <Tab label="Users want to Publisher" {...a11yProps(1)} />
              <Tab label="Users Active" {...a11yProps(2)} />
              <Tab label="Users Locked" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="users-list">
              {wtdevUsers.map((u) => (
                <div key={u._id} className="user-card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${u.avatarPath}` || u.avatarPath}  // Use custom avatar or default
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="users-list">
              {wtpubUsers.map((u) => (
                <div key={u._id} className="user-card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${u.avatarPath}` || u.avatarPath}  // Use custom avatar or default
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="users-list">
              {activeUsers.map((u) => (
                <div key={u._id} className="user-card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${u.avatarPath}` || u.avatarPath}  // Use custom avatar or default
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="users-list">
              {lockedUsers.map((u) => (
                <div key={u._id} className="user-card">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${u.avatarPath}` || u.avatarPath}  // Use custom avatar or default
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
          </CustomTabPanel>
        </Box>

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
