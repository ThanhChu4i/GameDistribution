import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteUser = ({ userId, onDelete }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8081/user', {
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
  }, []);

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to delete request
        },
      });
      onDelete(); // Call onDelete callback to notify parent of successful deletion
      navigate('/'); // Redirect to homepage after deletion
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <button onClick={handleDelete}>Xóa tài khoản</button>
    </div>
  );
};

export default DeleteUser;
