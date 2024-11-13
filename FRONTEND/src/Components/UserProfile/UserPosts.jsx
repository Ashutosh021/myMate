import React from "react";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";
import "./profilepagecss.css";
import Userpostpage from "./UserpostsFolder/Userpostpage";
import PhotoViewer from './PhotoViewer/PhotoViewer'

const UserPosts = () => {
  return (
    <div className="maincontainer">
      <div className="sidebarcontainer">
          <ProfileSidebar></ProfileSidebar>
      </div>
      <div className="centercontainer">
        <Userpostpage></Userpostpage>
        </div>
      <div className="photocontainer">
        <PhotoViewer></PhotoViewer>
      </div>
    </div>
  );
};

export default UserPosts;
