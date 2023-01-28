import { Navigate, useLocation } from 'react-router-dom';
import { TNewSessionOutput } from '../NewSession/components/NewSessionForm/generators';
import SessionProvider from './components/SessionProvider';

const Session = () => {
  const location = useLocation();
  const sessionState = location.state as TNewSessionOutput;

  const take = sessionState.pairsInNumber;
  const skip = (sessionState.groupNumber - 1) * take;

  if (!sessionState) return <Navigate to="/new-session" replace></Navigate>;

  return <SessionProvider sessionState={sessionState} skip={skip} take={take} />;
};

export default Session;
