import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../providers/UserContext.provider';

const useProtectAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const path = pathname.split('/').at(-1) ?? '';
    if (path === 'auth') {
      navigate('/auth/login', { replace: true });
    }
    if (user) {
      navigate('/protected', { replace: true });
    }
  }, [pathname]);
};

export default useProtectAuth;
