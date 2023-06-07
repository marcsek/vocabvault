import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../providers/UserContext.provider';
import Dashboard from './Dashboard/Dashboard.page';

const Landing = () => {
  const location = useLocation();
  const user = useUser();

  return !user ? <Navigate to="/auth/login" state={{ from: location }} replace /> : <Dashboard />;
};

export default Landing;
