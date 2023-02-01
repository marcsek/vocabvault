import { trpc } from '../utils/trpc';

export const useCreateSession = (onSuccess: () => void) => {
  return trpc.session.createSession.useMutation({ onSuccess });
};
