import React from "react";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ setCurrentComponent }) => {
  return (
    <div className="profile-sidebar">
      <div className="sidebar-box">
        <ul>
          <li className="sidebar-item" onClick={() => setCurrentComponent('About')}>
            <div className="sidebar-item-box">
              <span>About</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('UserPost')}>
            <div className="sidebar-item-box">
              <span>Posts</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('Education')}>
            <div className="sidebar-item-box">
              <span>Education</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('Projects')}>
            <div className="sidebar-item-box">
              <span>Projects</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('WebLinks')}>
            <div className="sidebar-item-box">
              <span>Web Links</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('Followers')}>
            <div className="sidebar-item-box">
              <span>Followers</span>
            </div>
          </li>
          <li className="sidebar-item" onClick={() => setCurrentComponent('Followings')}>
            <div className="sidebar-item-box">
              <span>Followings</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
