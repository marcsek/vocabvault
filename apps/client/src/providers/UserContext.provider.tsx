import { createContext, useContext } from 'react';
import { trpc } from '../utils/trpc';

const UserContext = createContext<{ user: { name: string; email: string; id: string } | null }>({ user: null });

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = trpc.user.getUser.useQuery(undefined, {
    queryKey: ['user.getUser', undefined],
    retry: false,
    useErrorBoundary: true,
    suspense: true,
    refetchInterval: 600000,
    enabled: !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/),
  });

  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
