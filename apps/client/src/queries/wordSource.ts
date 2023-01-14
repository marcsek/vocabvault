import { trpc } from '../utils/trpc';

export const useGetAvailableWordSources = () => {
  return trpc.wordSources.getAllUserAvailableWordSources.useQuery(undefined, {
    onSettled(data) {
      console.log(data);
    },
  });
};

export const useGetDataSourceByID = (id: string) => {
  return trpc.wordSources.getWordSourceByID.useQuery(
    { id },
    {
      onSettled(data) {
        console.log(data);
      },
    }
  );
};

export const useUpdateWordSource = () => {
  return trpc.wordSources.updateWordSource.useMutation();
};

export const useDeleteWordSource = () => {
  return trpc.wordSources.deleteWordSource.useMutation();
};
