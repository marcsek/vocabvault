import { trpc } from '../utils/trpc';

export const useGetAvailableWordSources = () => {
  return trpc.wordSources.getAllUserAvailableWordSources.useQuery(
    {},
    {
      onSettled(data) {
        console.log(data);
      },
    }
  );
};
