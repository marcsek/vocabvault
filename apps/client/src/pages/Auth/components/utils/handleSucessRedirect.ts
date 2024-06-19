import { QueryClient } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';
import { TContext, trpc } from '../../../../utils/trpc';
import { getQueryKey } from '@trpc/react-query';

interface Props {
  navigate: NavigateFunction;
  queryClient: QueryClient;
  trpcContext: TContext;
}

const handleSucessRedirect = async ({ navigate, queryClient, trpcContext }: Props) => {
  const getUserKey = getQueryKey(trpc.user.getUser, undefined, 'query');

  queryClient.setQueryData(getUserKey, null);
  queryClient.resetQueries({ queryKey: [getQueryKey] });
  await trpcContext.user.getUser.fetch();
  navigate('/word-sources', { replace: true });
};

export default handleSucessRedirect;
