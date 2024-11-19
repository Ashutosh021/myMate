import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./sidebarToggle.css";

const SidebarToggle = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebarToggle ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <nav>
        <NavLink to="/feed" onClick={toggleSidebar}>
          <FaHome /> Feed
        </NavLink>
        <NavLink to="/profile" onClick={toggleSidebar}>
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/settings" onClick={toggleSidebar}>
          <FaCog /> Settings
        </NavLink>
        <NavLink to="/logout" onClick={toggleSidebar}>
          <FaSignOutAlt /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default SidebarToggle;
