import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaSun, FaMoon, FaBars } from "react-icons/fa";
import SidebarToggle from "../SidebarToggle/SidebarToggle";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "/logo.png";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [profilePic, setProfilePic] = useState(""); // State to store the profile picture
  const [userId, setUserId] = useState(null); // State to store the user ID
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  // Fetch the user's profile information (including profile picture and userId)
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Get userId from localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Set the userId in state

      const fetchUserProfile = async () => {
        try {
          const authToken = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:5000/api/user/getuser/${storedUserId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });

          const data = await response.json();

          if (data && data.user) {
            setProfilePic(data.user.profilePic); // Update the profile picture from the API response
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile(); // Fetch the profile if userId is available
    } else {
      console.log("No userId found in localStorage");
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Navigate to the user profile page when the profile picture is clicked
  const handleUserClick = () => {
    if (userId) {
      navigate(`/user_profile/${userId}`);
    }
  };

  return (
    <>
      <div className={`navbar ${isDarkMode ? "navbar-dark" : "navbar-light"}`}>
        <NavLink to="/feed">
          <div className="navbar-logo">
            <img src={logo} alt="My Mate Logo" />
          </div>
        </NavLink>

        {/* Search and Icons */}
        <div className="navbar-search-icons">
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
            {isDarkMode ? (
              <FaSun className="icon" onClick={toggleDarkMode} />
            ) : (
              <FaMoon className="icon" onClick={toggleDarkMode} />
            )}
          </div>

          <div className="navbar-profile">
            {/* Profile image with click handler */}
            <img
              src={profilePic || "/default-profile-pic.jpg"} // Fallback to a default image if profilePic is empty
              alt="User Profile"
              className="profile-image"
              onClick={handleUserClick} // Handle the click to navigate to the user profile
            />
          </div>
        </div>

        {/* Menu toggle button */}
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar Component */}
      <SidebarToggle isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
