import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from "../Store/useAuthStore";
const PublicRoute = ({children}) => {

  const { token } = useAuthStore();
  if (token) return <Navigate to='/' />;

  return children;
}
export default PublicRoute