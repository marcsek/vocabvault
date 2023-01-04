import { QueryClient } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';
import { TContext, trpc } from '../../../../utils/trpc';

interface Props {
  navigate: NavigateFunction;
  queryClient: QueryClient;
  trpcContext: TContext;
}

const handleSucessRedirect = async ({ navigate, queryClient, trpcContext }: Props) => {
  const getUserKey = trpc.user.getUser.getQueryKey(undefined, 'query');
  queryClient.setQueryData(getUserKey, null);
  queryClient.resetQueries(getUserKey);
  await trpcContext.user.getUser.fetch();
  navigate('/protected', { replace: true });
};

export default handleSucessRedirect;
