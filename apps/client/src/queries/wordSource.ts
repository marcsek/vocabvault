import { trpc } from '../utils/trpc';

export const useGetAvailableWordSources = () => {
  return trpc.wordSources.getAllUserAvailableWordSources.useQuery(undefined, {
    onSettled(data) {
      console.log(data);
    },
  });
};

export const useGetDataSourceByID = (id: string) => {
  const queryClient = trpc.useContext();

  return trpc.wordSources.getWordSourceByID.useQuery(
    { id },
    {
      onSettled(data) {
        console.log(data);
      },
      initialData: () => {
        const data = queryClient.wordSources.getAllUserAvailableWordSources.getData()?.find((e) => e.id === id);
        if (data) return { ...data };
      },
      staleTime: Infinity,
    }
  );
};

export const useUpdateWordSource = () => {
  const queryClient = trpc.useContext();
  return trpc.wordSources.updateWordSource.useMutation({
    onSuccess(_data, { id }) {
      queryClient.wordSources.getWordSourceByID.invalidate({ id });
      queryClient.wordSources.getAllUserAvailableWordSources.refetch();
    },
  });
};

export const useDeleteWordSource = () => {
  return trpc.wordSources.deleteWordSource.useMutation();
};

export const useGetWordSourceWordPairs = (id: string, { page, perPage }: { page: number; perPage: number }) => {
  return trpc.wordSources.getWordSourceWordPairs.useQuery(
    { sourceID: id ?? '', pagination: { page, perPage } },
    {
      keepPreviousData: true,
      onSettled(data) {
        console.log(data);
      },
      staleTime: Infinity,
      cacheTime: 1000 * 60,
    }
  );
};
