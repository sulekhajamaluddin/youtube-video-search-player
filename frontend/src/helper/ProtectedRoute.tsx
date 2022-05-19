import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginContext } from './Context';

const ProtectedRoute = () => {
  const { loggedIn } = useContext(LoginContext);
  return loggedIn === true ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
