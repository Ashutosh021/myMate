import React from 'react';
// import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import PostFeed from '../Postfeed/PostFeed';
import ChatPanel from '../ChatPanel/ChatPanel';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* <Navbar /> */}
      <div className="home-body">
        <Sidebar />
        <PostFeed />
        <ChatPanel />
      </div>
    </div>
  );
};

export default HomePage;