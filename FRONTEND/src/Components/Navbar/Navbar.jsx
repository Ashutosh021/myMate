import React from "react";
import { FaSearch, FaBell, FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";
import logo from "/logo.png";
import defaultProfile from "/user.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/feed">
        <div className="navbar-logo">
          <img src={logo} alt="My Mate Logo" />
        </div>
      </NavLink>

      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search Courses, Documents, Activities..."
          className="search-input"
        />
      </div>
      <div className="navbar-icons">
        <div className="icon notification">
          <FaBell />
          <span className="notification-dot"></span>
        </div>
        <FaSun className="icon" />
        <div className="toggle-switch">
          <input type="checkbox" id="dark-mode-toggle" />
          <label htmlFor="dark-mode-toggle"></label>
        </div>
        <FaMoon className="icon" />
      </div>
      <div className="navbar-profile">
        <img src={defaultProfile} alt="User Profile" />
      </div>
    </div>
  );
};

export default Navbar;
