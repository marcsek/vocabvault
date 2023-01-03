import { Link, Outlet } from 'react-router-dom';
import AuthProviderWindow from './components/AuthProviderWindow';

const AuthPage = () => {
  return (
    <div>
      <div>AuthPage</div>
      <Link to="/protected">Auth Required</Link>
      <Outlet />
      <AuthProviderWindow />
    </div>
  );
};

export default AuthPage;
