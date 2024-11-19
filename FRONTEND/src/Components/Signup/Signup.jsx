import React, { useState, useEffect } from 'react';
import './signup.css';
import logo from "/logo.png";
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null,  // Add a state to hold the file
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Append regular form data
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
  
    // Append the profile pic (if it exists)
    if (formData.profilePic) {
      formDataToSend.append('profilePic', formData.profilePic);
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        body: formDataToSend,  // Don't set Content-Type manually
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        setFormData({ name: '', email: '', password: '', profilePic: null });
        window.location.href = '/feed';
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };
  

  return (
    <main>
      <div className="signup-container">
        <div className="signup-left">
          <img src={logo} className="logo" alt="Logo" />
          <h1>Create Your Account</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Type Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
            <label style={{"textAlign":"left","color":"white","font":"20px"}}>Profile Pic</label>
              <input
                type="file"
                name="profilePic"
                className="form-input"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="signup-right">
          <h2>Already Have an Account?</h2>
          <p>Log in to explore more features.</p>
          <NavLink to="/login">
            <button className="btn btn-secondary">Log In</button>
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
