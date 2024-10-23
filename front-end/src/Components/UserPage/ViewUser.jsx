import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ViewUser = ({ onEdit }) => {
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
        const response = await axios.get('http://localhost:8081/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]); // Thêm `navigate` vào dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try again</button> {/* Nút thử lại */}
    </div>
  );

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.first_name || 'Not provided'}</p>
          <p><strong>Last Name:</strong> {user.last_name || 'Not provided'}</p>
          <p><strong>Country:</strong> {user.country || 'Not provided'}</p>
          <p><strong>Company:</strong> {user.company || 'Not provided'}</p>
          <p>Created_in: {user.created_in}</p>
          <p>Update_in: {user.update_in}</p>
          <button onClick={() => onEdit(user)}>Changes Infomation</button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ViewUser;
