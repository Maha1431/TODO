// src/Components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'; 
import { useNavigate } from 'react-router-dom';

const Login = ({ onRegisterClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response =  await axios.post('http://localhost:4000/api/auth/login', { email, password });
    const { token, userId } = response.data; // Assuming response.data has both token and email
    
    const userData = { token, userId };
    localStorage.setItem('userData', JSON.stringify(userData));
      toast.success('Login successful!');
      onLoginSuccess(token); // Notify the parent component about successful login
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        toast.error('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p> Don't have an account? <span className='signup' onClick={onRegisterClick}>SignUp</span></p>
      <button className='google'>SignUp with Google</button>
      <ToastContainer />
    </div>
  );
};

export default Login;
