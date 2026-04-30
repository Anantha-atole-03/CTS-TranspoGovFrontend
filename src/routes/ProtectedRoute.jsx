
//write protected route component that checks if user is authenticated before rendering the component, if not redirect to login page
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;