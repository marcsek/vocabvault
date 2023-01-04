import { createContext, useContext, useEffect } from 'react';
import { useGetUser } from '../queries/user';

const UserContext = createContext<{ user: { name: string; email: string; id: string } | null | undefined }>({ user: null });

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = useGetUser();

  useEffect(() => console.log(user), [user]);
  return <UserContext.Provider value={{ user: user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
