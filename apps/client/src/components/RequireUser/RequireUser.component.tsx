import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../providers/UserContext.provider';

const RequireUser = () => {
  const { user } = useUser();
  const location = useLocation();
  console.log('Require User', user);
  return user ? <Outlet /> : <Navigate to="auth/login" state={{ from: location }} replace />;
};

export default RequireUser;
