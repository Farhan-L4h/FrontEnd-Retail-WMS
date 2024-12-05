import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContex';

const ProtectedRoute = ({ role, element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />; // Redirect jika tidak login
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" />; // Redirect jika role tidak sesuai
  }

  return element;
};

export default ProtectedRoute;
