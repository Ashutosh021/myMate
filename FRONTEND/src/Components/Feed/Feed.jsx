import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PostFeed from '../Postfeed/PostFeed';
import ChatPanel from '../ChatPanel/ChatPanel';
import './Feed.css';

const Feed = () => {
  useEffect(() => {
    document.title = "Feed";
}, []); 
  return (
    <div className="home-page">
      <div className="home-body">
        <Sidebar />
        <PostFeed />
        <ChatPanel />
      </div>
    </div>
  );
};

export default Feed;