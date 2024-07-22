// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import './App.css'; // Assuming you have some global styles
import Task from './Components/task/Task';

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false); // Ensure login is not showing
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false); // Ensure register is not showing
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state on logout
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state on successful login
    setShowLogin(false); // Hide login after success
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home onLoginClick={handleLogin} onRegisterClick={handleRegister} onLogout={handleLogout} isLoggedIn={isLoggedIn} />} />
          {/* Add other routes here if necessary */}
        </Routes>
        {showRegister && (
          <div className="register-container">
            <Register onLoginClick={handleLogin} />
            <button onClick={() => setShowRegister(false)} className='btn'>Back to Home</button>
          </div>
        )}
        {showLogin && (
          <div className="login-container">
            <Login onRegisterClick={handleRegister} onLoginSuccess={handleLoginSuccess} />
            <button onClick={() => setShowLogin(false)} className='btn'>Back to Home</button>
          </div>
        )}
        {isLoggedIn && (
          <div className="task-container">
            <Task />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
