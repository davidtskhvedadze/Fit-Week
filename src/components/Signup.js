import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/user.css';

const Signup = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/auth/signup', userData);
      console.log('Signup successful:', response.data);
      alert('Signup successful. Please login to continue.');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data.error === 'User with this email already exists.') {
        setError('This email is already in use. Please use a different email.');
      } else {
        setError('Signup failed. Please try again.'); // Display general error message to user
      }
    }
  };

  return (
    <div className='login-container'>
      <h4>Signup</h4>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
        {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <div className='user-buttons'>
        <button className="login-button" type="submit">Signup</button>
        <button className="login-button" onClick={handleBack} type="submit">Back</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;