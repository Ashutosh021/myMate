import React from 'react';

const AboutPage = ({ user }) => {
  return (
    <div className="about-page">
      <h2>About</h2>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
};

export default AboutPage;
