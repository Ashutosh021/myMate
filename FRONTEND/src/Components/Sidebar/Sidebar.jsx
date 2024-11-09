import React from 'react';
import './Sidebar.css';

const users = [
  { name: 'Ashutosh' },
  { name: 'Abhinav' },
  { name: 'Divyansh' },
  // Add more users here
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Your Network</h3>
      {users.map((user, index) => (
        <div key={index} className="sidebar-user">
          <img src="/user-avatar.png" alt={user.name} className="sidebar-avatar" />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;