import { trpc } from '../utils/trpc';

export const useGetAvailableWordSources = () => {
  return trpc.wordSources.getAllUserAvailableWordSources.useQuery(undefined, {
    onSettled(data) {
      console.log(data);
    },
  });
};
