import React, { useContext, useState } from 'react';
import loginValidation from './LoginValidication'; // Đảm bảo tên tệp chính xác
import axios from 'axios';
import { AuthContext } from '../../AuthContext/AuthContext'; // Nhập AuthContext
import { useNavigate } from 'react-router-dom'; // Sử dụng điều hướng

const LoginPopup = ({ onRequestClose }) => {
  const { login } = useContext(AuthContext); // Lấy hàm login từ context
  const navigate = useNavigate(); // Khởi tạo điều hướng
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember_me: false, // State cho "Nhớ tôi"
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi đầu vào
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Xử lý gửi biểu mẫu
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = loginValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Gửi dữ liệu đăng nhập đến máy chủ
        const res = await axios.post('http://localhost:8081/login', values);
        // Lưu token vào cookie
        const token = res.data.token;
        const isAdmin = res.data.isAdmin;
        const isDevPub = res.data.isDevPub;
        //const expiresIn = values.remember_me ? 30 : 1; // 30 ngày nếu "Nhớ tôi", 1 ngày nếu không
        login(token, isAdmin, isDevPub);

        // Điều hướng
        if (res.data.isAdmin) {
          navigate('/admin'); // Điều hướng đến trang admin
        } else {
          navigate('/'); // Điều hướng đến trang chính
        }

        // Đóng popup khi thành công
        onRequestClose();
      } catch (err) {
        console.error(err);
        setSubmitError(err.response?.data?.message || 'Login failed');
        setSubmitSuccess('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {submitSuccess && <div className="success-message">{submitSuccess}</div>}
      {submitError && <div className="error-message">{submitError}</div>}

      <div className="input-group">
        <label htmlFor="email"><strong>Email</strong></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          onChange={handleInput}
          required
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="password"><strong>Password</strong></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          value={values.password}
          onChange={handleInput}
          required
        />
        {errors.password && <span className="text-danger">{errors.password}</span>}
      </div>
      <div className="login-options">
        <label>
          <input
            type="checkbox"
            name="remember_me"
            checked={values.remember_me}
            onChange={handleInput}
          /> Remember me?
        </label>
        <a href="#" className="forgot-password">Forgot Password?</a>
      </div>

      <button type="submit" className="btn-login" disabled={isLoading}>
        {isLoading ? 'Login...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginPopup;
