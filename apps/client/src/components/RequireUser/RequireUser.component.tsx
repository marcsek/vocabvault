import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../providers/UserContext.provider';

const RequireUser = () => {
  const { user } = useUser();
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="auth/login" state={{ from: location }} replace />;
};

export default RequireUser;
