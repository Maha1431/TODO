// src/Pages/Home.js
import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import './home.css';

const Home = ({ onLoginClick, onRegisterClick, onLogout, isLoggedIn }) => {
  const handleLogout = () => {
    onLogout(); // Callback to notify parent component
  };

  return (
    <div className="home">
      <span className='icon'>
        <AssignmentOutlinedIcon />
      </span>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className='btn'>Logout</button>
        </>
      ) : (
        <div>
          <button onClick={onLoginClick} className='btn'>Login</button>
          <button onClick={onRegisterClick} className='btn'>Register</button>
        </div>
      )}
     
    </div>
  );
};

export default Home;
