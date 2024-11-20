import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  useEffect(() => {
    // Clear local storage on logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId"); // Remove other relevant data if necessary
  }, []);

  return <Navigate to="/" replace={true} />;
};

export default Logout;
