import { useUser } from '../../providers/UserContext.provider';
import Dashboard from './Dashboard/Dashboard.page';

const Landing = () => {
  const user = useUser();

  return !user ? <div className="max-h-96">Huh</div> : <Dashboard />;
};

export default Landing;
