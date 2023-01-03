import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../utils/trpc';

const UserContext = createContext<{ user: { name: string; email: string; id: string } | null }>({ user: null });

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const { data: user } = trpc.user.getUser.useQuery(undefined, {
    onSuccess() {
      navigate('/protected');
    },
    retry: false,
    useErrorBoundary: true,
    suspense: true,
    refetchInterval: 600000,
    enabled: !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/) && !(window.opener && window.opener !== window),
  });
  useEffect(() => console.log(user), [user]);
  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
