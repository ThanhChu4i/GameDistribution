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
          <p>Email: {user.email}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Country: {user.country || 'Not provided'}</p> {/* Hiển thị mặc định nếu không có */}
          <p>Company: {user.company || 'Not provided'}</p> {/* Hiển thị mặc định nếu không có */}
          <p>Created_in: {user.created_in}</p>
          <button onClick={() => onEdit(user)}>Sửa thông tin</button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ViewUser;
