import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  return (
    <header>
        <div className="container">
          <Link to="/">
            <h1>Fit-Week</h1>
          </Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
    </header>
  )
};

export default Navbar;