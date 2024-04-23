import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/index.css';
import '../styles/home.css';
import logo from '../assets/armlogoblue.png';

const Navbar = () => {
  const navigate = useNavigate();
  

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  }

  return (
    <header>
      <img src={logo} alt="logo" onClick={signOut}/>
      <h1>Fit-Week</h1>
      {isAuthenticated() && <button className='slide-in-from-top' onClick={signOut}>Sign Out</button>}
    </header>
  )
};

export default Navbar;