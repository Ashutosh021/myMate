import React, { useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
 
  return (
    <div className="mymate-login-container">
      <main className="mymate-main">
        <div className="left-section">
          <h1>Welcome to your professional community</h1>
          <NavLink to={"./infuture"}>
            <button className="google-signin">Continue with Google</button>
          </NavLink>
          <NavLink to={"./login"}>
            <button className="email-signin">Signup / Login with email</button>
          </NavLink>
          <p>
            By clicking Continue, you agree to MyMate{" "}
            <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and{" "}
            <a href="#">Cookie Policy</a>.
          </p>
          <p>
            New to MyMate? <a href="#">Join now</a>
          </p>
        </div>
        <div className="right-section">
          {/* Circular logo with text */}
          <div
            className="logo"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="logo-line">
              {"My"}
            </span>
            <span className="logo-line">
              {"Mate"}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
