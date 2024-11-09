
import React, { useState } from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import logo from "/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message,setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'omit', // Important for sending cookies
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ email: '', password: '' });
        window.location.href = '/'; // Redirect to home page on success
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <main>
      <div className='l'>
        <img src={logo} className='logo' alt="logo"/>
        <div className='login'>
          <h1><b>Log In to Your Account</b></h1>
          <br/>
          <form className='form' onSubmit={handleSubmit}>
            E-mail
            <br/>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br/>
            Password
            <br/>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br/>
            <button type='submit' className="btn btn-success btnsignup">Sign in</button>
          </form>
        </div>
        <br/>
        <span className='container d-flex'><hr /> or <hr /></span>
        <br/>
        <div className='icon-con'>
          <FaGoogle className='icon'/>
          <FaFacebookF className='icon' />
        </div>
      </div>
      <div className='r text-light'>
        <h1>New Here ?</h1>
        <br />
        <p>
          Sign up and discover a great<br />
          amount of new opportunities.
        </p>
        <NavLink to="/signup">
          <button type='button' className="btn text-success" style={{ background: "#efece8" }}>
            Sign up
          </button>
        </NavLink>
      </div>
    </main>
  );
}

export default Login;