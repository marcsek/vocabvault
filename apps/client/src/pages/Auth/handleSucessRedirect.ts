import { QueryClient } from '@tanstack/react-query';
import { NavigateFunction } from 'react-router-dom';
import { trpc } from '../../utils/trpc';

interface Props {
  navigate: NavigateFunction;
  queryClient: QueryClient;
}

const handleSucessRedirect = async ({ navigate, queryClient }: Props) => {
  const getUserKey = trpc.user.getUser.getQueryKey(undefined, 'query');
  queryClient.setQueryData(getUserKey, null);
  await queryClient.resetQueries(getUserKey);
  await queryClient.refetchQueries(getUserKey);
};

export default handleSucessRedirect;
