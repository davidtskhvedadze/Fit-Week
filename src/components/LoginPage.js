import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json' 
      }
    });

    const json = await response.json();

    if(!response.ok) {
      setError(json.error);
    }

    if(response.ok) {
      console.log('User logged in', json);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input 
        type="text"
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      />
      <label>Password:</label>
      <input 
        type="password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;