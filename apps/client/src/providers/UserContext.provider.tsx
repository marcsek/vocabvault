import { inferProcedureOutput } from '@trpc/server';
import { createContext, useContext, useEffect } from 'react';
import { useGetUser } from '../queries/user';
import { userRouter } from 'server/src/routers/user';

type TUserProcedureOutput = inferProcedureOutput<typeof userRouter.getUser>;

const UserContext = createContext<TUserProcedureOutput>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = useGetUser();

  useEffect(() => console.log(user), [user]);
  return <UserContext.Provider value={user ?? null}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
