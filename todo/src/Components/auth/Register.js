import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css'; // Make sure to create and import the CSS file

const Register = ({ onLoginClick }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Make API request
    try {
      await axios.post('https://task-management-5fa0.onrender.com/api/auth/register', { firstName, lastName, email, password, confirmPassword });
      
      // Handle successful registration
      toast.success('Registration successful! ..');
      
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
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">SignUp</button>
      </form>
      <p>Already have an account? <span className='logins' onClick={onLoginClick}>Login</span></p>
      <button className='google'>SignUp with Google</button>
      <ToastContainer />
    </div>
  );
};

export default Register;
