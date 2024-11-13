import React from "react";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";
import "./profilepagecss.css";
import Aboutpage from "./AboutFolder/Aboutpage";
import PhotoViewer from "./PhotoViewer/PhotoViewer";

const About = () => {
  return (
    <div className="maincontainer">
      <div className="sidebarcontainer">
          <ProfileSidebar></ProfileSidebar>
      </div>
      <div className="centercontainer">
        <Aboutpage></Aboutpage>
      </div>
      <div className="photocontainer">
        <PhotoViewer></PhotoViewer>
      </div>
    </div>
  );
};

export default About;
