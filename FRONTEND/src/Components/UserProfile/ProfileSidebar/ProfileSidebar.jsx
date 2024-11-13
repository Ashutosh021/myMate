// Sidebar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = () => {
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract the _id from the URL using a regular expression
    const match = location.pathname.match(
      /\/user_profile\/about\/([a-f0-9]{24})/
    );

    if (match) {
      setUserId(match[1]); // Set the extracted _id
    } else {
      console.log("No valid _id found in the URL");
    }
  }, [location]);

  const navigate = useNavigate(); // Hook for navigation
  const handleUserClick1 = () => {
    navigate(`/user_profile/about/${userId}`);
  };
  const handleUserClick2 = () => {
    navigate(`/user_profile/education/${userId}`);
  };
  const handleUserClick3 = () => {
    navigate(`/user_profile/projects/${userId}`);
  };
  const handleUserClick4 = () => {
    navigate(`/user_profile/posts/${userId}`);
  };
  const handleUserClick5 = () => {
    navigate(`/user_profile/followers/${userId}`);
  };
  const handleUserClick6 = () => {
    navigate(`/user_profile/following/${userId}`);
  };
  const handleUserClick7 = () => {
    navigate(`/user_profile/weblinks/${userId}`);
  };
  return (
    <div className="sidebar1 stickinprofilepage">
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick1}
        style={{ background: "#efece8" }}>
        About
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick2}
        style={{ background: "#efece8" }}>
        Education
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick3}
        style={{ background: "#efece8" }}>
        Projects
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick4}
        style={{ background: "#efece8" }}>
        Posts
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick5}
        style={{ background: "#efece8" }}>
        Followers
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick6}
        style={{ background: "#efece8" }}>
        Following
      </button>
      <button
        type="button"
        className="btn text-success"
        onClick={handleUserClick7}
        style={{ background: "#efece8" }}>
        Web links
      </button>
    </div>
  );
};

export default ProfileSidebar;
