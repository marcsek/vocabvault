import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../../../utils/trpc';

const useLogout = () => {
  const queryClient = useQueryClient();

  return trpc.auth.logout.useMutation({
    onSuccess() {
      const userKey = trpc.user.getUser.getQueryKey(undefined, 'query');
      queryClient.setQueryData(userKey, null);
    },
  });
};

export default useLogout;
