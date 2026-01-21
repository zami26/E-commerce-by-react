import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check if user is authenticated as admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  // In production, you might want to check Firebase auth with custom claims
  // For now, we'll use localStorage flag set during admin login
  
  if (!isAdmin) {
    // Redirect to admin login if not authenticated as admin
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default AdminRoute;