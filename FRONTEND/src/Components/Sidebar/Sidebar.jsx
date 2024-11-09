import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Sidebar.css';

const Sidebar = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Set the Authorization header
          },
        });
        const data = await response.json();

        // Accessing the 'following' data from the 'user' object
        if (data.user && data.user.following) {
          setFollowingUsers(data.user.following); 
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Function to navigate to the user's profile page when their name or image is clicked
  const handleUserClick = (userId) => {
    navigate(`/api/user/getuser/${userId}`);
  };

  return (
    <div className="sidebar">
      <h3>Your Network</h3>
      {followingUsers.length === 0 ? (
        <p>You don't follow anyone</p>
      ) : (
        followingUsers.map((user) => (
          <div key={user._id} className="sidebar-user" onClick={() => handleUserClick(user._id)}>
            <img 
              src={user.profilePic || '/default-avatar.png'} 
              alt={user.name} 
              className="sidebar-avatar" 
            />
            <span>{user.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
