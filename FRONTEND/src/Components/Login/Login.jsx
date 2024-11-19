import React, { useState, useEffect } from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import logo from "/logo.png";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'omit', // Important for sending cookies
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        setFormData({ email: '', password: '' });
        window.location.href = '/feed'; // Redirect to home page on success
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };
 
  return (
    <main>
      <div className='login-container'>
        <div className='login-left'>
          <img src={logo} className='logo' alt="logo" />
          <h1>Log In to Your Account</h1>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-group'>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className='login-right'>
          <h2>New Here?</h2>
          <p>Sign up and discover a great amount of new opportunities.</p>
          <NavLink to="/signup">
            <button className="btn btn-secondary">Sign Up</button>
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default Login;
