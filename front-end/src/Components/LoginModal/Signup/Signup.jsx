// Signup.jsx

import React, { useState, useEffect } from 'react';
import signupValidation from './SignupValidication'; // Đảm bảo tên file đúng
import axios from 'axios';

const SignupPopup = ({ onRequestClose }) => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    country: '',
    website: '',
    company: '',
    expected_traffic: '',
    accept_terms: false,
    accept_privacy: false,
    wanttodev: false,
    wanttopub: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = signupValidation(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsLoading(true);
        // Gửi dữ liệu đến server
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/signup`, values)
          .then((res) => {
            console.log(res);
            setSubmitSuccess('Registration successful!');
            setSubmitError('');
            // Thực hiện các hành động sau khi đăng ký thành công (ví dụ: đóng modal, chuyển hướng)
            onRequestClose();
          })
          .catch((err) => {
            console.log(err);
            setSubmitError('Registration failed. Please try again.');
            setSubmitSuccess('');
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, values, onRequestClose]);

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {submitSuccess && <div className="success-message">{submitSuccess}</div>}
      {submitError && <div className="error-message">{submitError}</div>}
      <div className= "check-dev-pub">
      <div className="input-group checkbox">
        <label>
          <input
            type="checkbox"
            name="wanttodev"
            checked={values.wanttodev}
            onChange={handleInput}
          /> Developer
        </label>
      </div>
      <div className="input-group checkbox">
        <label>
          <input
            type="checkbox"
            name="wanttopub"
            checked={values.wanttopub}
            onChange={handleInput}
          /> Publisher
        </label>
      </div>
      </div>
      <div className="input-group">
        <label><strong>First Name</strong></label>
        <input
          type="text"
          name="first_name"
          placeholder="Your first name"
          value={values.first_name}
          onChange={handleInput}
          required
        />
        {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
      </div>
      <div className="input-group">
        <label><strong>Last Name</strong></label>
        <input
          type="text"
          name="last_name"
          placeholder="Your last name"
          value={values.last_name}
          onChange={handleInput}
          required
        />
        {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
      </div>
      <div className="input-group">
        <label><strong>Email</strong></label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          onChange={handleInput}
          required
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>
      <div className="input-group">
        <label><strong>Password</strong></label>
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={values.password}
          onChange={handleInput}
          required
        />
        {errors.password && <span className="text-danger">{errors.password}</span>}
      </div>
      <div className="input-group">
        <label><strong>Country</strong></label>
        <select
          name="country"
          value={values.country}
          onChange={handleInput}
          required
        >
          <option value="">Select a country</option>
          <option value="vietnam">Vietnam</option>
          <option value="japan">Japan</option>
          <option value="south-korea">South Korea</option>
          <option value="usa">United States</option>
          <option value="france">France</option>
          <option value="germany">Germany</option>
          <option value="spain">Spain</option>
          <option value="china">China</option>
          <option value="italy">Italy</option>
          <option value="portugal">Portugal</option>
          <option value="russia">Russia</option>
          <option value="saudi-arabia">Saudi Arabia</option>
          <option value="india">India</option>
          <option value="thailand">Thailand</option>
          <option value="indonesia">Indonesia</option>
          <option value="turkey">Turkey</option>
          <option value="netherlands">Netherlands</option>
          <option value="sweden">Sweden</option>
          <option value="poland">Poland</option>
          <option value="denmark">Denmark</option>
          <option value="norway">Norway</option>
          <option value="finland">Finland</option>
          <option value="greece">Greece</option>
          <option value="israel">Israel</option>
          <option value="hungary">Hungary</option>
          <option value="czech-republic">Czech Republic</option>
          <option value="slovakia">Slovakia</option>
          <option value="romania">Romania</option>
          <option value="ukraine">Ukraine</option>
          {/* Thêm các tùy chọn quốc gia khác */}
        </select>
        {errors.country && <span className="text-danger">{errors.country}</span>}
      </div>
      <div className="input-group">
        <label><strong>Website</strong></label>
        <input
          type="url"
          name="website"
          placeholder="yourwebsite.com"
          value={values.website}
          onChange={handleInput}
          required
        />
        {errors.website && <span className="text-danger">{errors.website}</span>}
      </div>
      <div className="input-group">
        <label><strong>Company</strong></label>
        <input
          type="company"
          name="company"
          placeholder="Company"
          value={values.company}
          onChange={handleInput}
          required
        />
        {errors.company && <span className="text-danger">{errors.company}</span>}
      </div>
      <div className="input-group">
        <label><strong>Expected Traffic</strong></label>
        <select
          name="expected_traffic"
          value={values.expected_traffic}
          onChange={handleInput}
          required
        >
          <option value="">Select a selection</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          {/* Thêm các tùy chọn traffic khác */}
        </select>
        {errors.expected_traffic && <span className="text-danger">{errors.expected_traffic}</span>}
      </div>
      <div className="input-group checkbox">
        <label>
          <input
            type="checkbox"
            name="accept_terms"
            checked={values.accept_terms}
            onChange={handleInput}
            required
          /> I ACCEPT the Terms and Conditions
        </label>
        {errors.accept_terms && <span className="text-danger">{errors.accept_terms}</span>}
      </div>
      <div className="input-group checkbox">
        <label>
          <input
            type="checkbox"
            name="accept_privacy"
            checked={values.accept_privacy}
            onChange={handleInput}
            required
          /> I ACCEPT the Privacy Policy
        </label>
        {errors.accept_privacy && <span className="text-danger">{errors.accept_privacy}</span>}
      </div>
      <button type="submit" className="btn-register" disabled={isLoading}>
        {isLoading ? 'Đang đăng ký...' : 'Registration'}
      </button>
    </form>
  );
};

export default SignupPopup;
