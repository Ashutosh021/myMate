import React from 'react';
import './Home.css';
import logo from '/logo.png'; // Replace with the path to the right-side image
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mymate-login-container">
      <main className="mymate-main">
        <div className="left-section">
          <h1>Welcome to your professional community</h1>
          <NavLink to={'./infuture'}>
          <button className="google-signin">Continue with Google</button>
          </NavLink>
          <NavLink to={'./login'}>
          <button className="email-signin">Sign in with email</button>
          </NavLink>
          <p>
            By clicking Continue, you agree to MyMate <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.
          </p>
          <p>
            New to MyMate? <a href="#">Join now</a>
          </p>
        </div>
        <div className="right-section">
          <img src={logo} alt="MyMate Community" />
        </div>
      </main>
    </div>
  );
};

export default Home;
