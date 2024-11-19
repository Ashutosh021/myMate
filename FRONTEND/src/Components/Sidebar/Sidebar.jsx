import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        
        if (data.user && data.user.following) {
          setFollowingUsers(data.user.following);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/user_profile/${userId}`);
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
            <div className="sidebar-user-info">
              <span>{user.name}</span>
              <p className="sidebar-user-details">
                Followers: {user.followers?.length || 0} <br></br> Skills: {user.skills?.join(", ") || "Not Provided"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
