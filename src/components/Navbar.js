import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header>
      <h1>Fit-Week</h1>
      <button onClick={signOut}>Sign Out</button>
    </header>
  )
};

export default Navbar;