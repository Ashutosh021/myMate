import React, { useState } from 'react';
import './signup.css';
import logo from "/logo.png";
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <main>
      <div className='ll'>
        <img src={logo} className='logo' alt="Logo" />
        <div className='signup'>
          <h1>
            <b>Create your account</b>
          </h1>
          <form className='form' onSubmit={handleSubmit}>
            Name
            <br />
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />
            E-mail
            <br />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter Your E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            Password
            <br />
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <input type="checkbox" name="terms" required />
            By creating an account, you agree to the <b>Terms and Conditions</b> and our <b>Privacy Policy</b>.
            <br />
            <br />
            <button type='submit' className="btn btn-success btnsignup">Sign Up</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
      <div className='rr text-light'>
        <h1>Welcome to My Mate</h1>
        <NavLink to="/login">
        <button type='button' className="btn text-success" style={{ background: "#efece8" }}>
            Login
          </button>
          </NavLink>
      </div>
    </main>
  );
};

export default SignUp;
