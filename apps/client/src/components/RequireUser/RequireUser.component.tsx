import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetUser } from '../../queries/user';

const RequireUser = () => {
  const location = useLocation();
  const { data: user } = useGetUser();

  return user ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireUser;
