import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/user.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.'); // Display error message to user
    }
  };

  return (
    <div className='login-container'>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
        {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <div className='user-buttons'>
          <button className="login-button" type="submit">Login</button>
          <button className='new-user'type="button" onClick={() => navigate('/signup')}>New User? Sign Up Here</button>
        </div>
      </form>
    </div>
  );
};

export default Login;