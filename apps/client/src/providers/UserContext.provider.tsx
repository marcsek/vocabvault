import { createContext, useContext } from 'react';
import { trpc } from '../utils/trpc';

const UserContext = createContext<{ user: { name: string; email: string; id: string } | null }>({ user: null });

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = trpc.user.getUser.useQuery(undefined, { queryKey: ['user.getUser', undefined] });
  console.log('user', user);

  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
