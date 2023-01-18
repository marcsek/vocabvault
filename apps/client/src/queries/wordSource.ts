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
        if (data) return data;
      },
      staleTime: 1000 * 60 * 5,
    }
  );
};

export const useCreateWordSource = () => {
  const trpcContext = trpc.useContext();

  return trpc.wordSources.createWordSource.useMutation({
    onSuccess(data) {
      const previousData = trpcContext.wordSources.getAllUserAvailableWordSources.getData();

      if (!data || !previousData) return;
      trpcContext.wordSources.getAllUserAvailableWordSources.setData(undefined, [...previousData, data]);
      console.log(data);
    },
  });
};

export const useUpdateWordSource = () => {
  const queryClient = trpc.useContext();
  return trpc.wordSources.updateWordSource.useMutation({
    onSuccess(data, { id }) {
      const previousData = queryClient.wordSources.getWordSourceByID.getData({ id });
      const newData = data.createdSources.at(0);

      if (!previousData || !newData) return;

      queryClient.wordSources.getWordSourceByID.setData({ id }, { ...previousData, ...newData });

      const previousWordSourceData = queryClient.wordSources.getAllUserAvailableWordSources.getData();

      if (!previousWordSourceData) return;
      const newWordSourceData = previousWordSourceData.map((e) => (e.id !== id ? e : { ...e, ...newData }));

      queryClient.wordSources.getAllUserAvailableWordSources.setData(undefined, newWordSourceData);
    },
  });
};

export const useDeleteWordSource = () => {
  const trpcContext = trpc.useContext();
  return trpc.wordSources.deleteWordSource.useMutation({
    onSuccess(_data, { id }) {
      const previousData = trpcContext.wordSources.getAllUserAvailableWordSources.getData();

      if (!previousData) return;
      const newData = previousData.filter((e) => e.id !== id);

      trpcContext.wordSources.getAllUserAvailableWordSources.setData(undefined, newData);
    },
  });
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
      cacheTime: 1000 * 60 * 1,
    }
  );
};
