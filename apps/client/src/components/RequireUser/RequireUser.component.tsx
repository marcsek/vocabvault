import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { trpc } from '../../utils/trpc';

const RequireUser = () => {
  const query = trpc.useContext();
  const location = useLocation();
  const user = query.user.getUser.getData();

  return user ? <Outlet /> : <Navigate to="auth/login" state={{ from: location }} replace />;
};

export default RequireUser;
