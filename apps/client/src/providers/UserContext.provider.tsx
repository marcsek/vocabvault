import { inferProcedureOutput } from '@trpc/server';
import { createContext, useContext } from 'react';
import { useGetUser } from '../queries/user';
import { userRouter } from 'server/src/routers/user';

type TUserProcedureOutput = inferProcedureOutput<typeof userRouter.getUser>;

const UserContext = createContext<TUserProcedureOutput | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = useGetUser();

  return <UserContext.Provider value={user ?? null}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
