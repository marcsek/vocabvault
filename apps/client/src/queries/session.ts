import { TGetSessionByUserIdInput } from 'server/src/schemas/session.schema';
import { trpc } from '../utils/trpc';

export const useCreateSession = (onSuccess: () => void) => {
  const trpcContext = trpc.useContext();

  return trpc.session.createSession.useMutation({
    onSuccess() {
      onSuccess();

      trpcContext.session.getSessionAsHistoryByUserId.reset();
    },
  });
};

export const useGetSessionAsHistoryByUserId = (input: TGetSessionByUserIdInput) => {
  return trpc.session.getSessionAsHistoryByUserId.useQuery(input, {
    gcTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useGetLastSession = () => {
  return trpc.session.getLastSession.useQuery(undefined, { throwOnError: true, suspense: true });
};

export const useGetUserStats = () => {
  return trpc.user.getUserStats.useQuery(undefined, { throwOnError: true, suspense: true });
};
