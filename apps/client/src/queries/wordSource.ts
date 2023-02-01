import { toast } from 'react-toastify';
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

export const useCreateWordSource = (onSuccess: () => void) => {
  const trpcContext = trpc.useContext();

  return trpc.wordSources.createWordSource.useMutation({
    onSuccess(data) {
      const previousData = trpcContext.wordSources.getAllUserAvailableWordSources.getData();

      if (!data || !previousData) return;
      trpcContext.wordSources.getAllUserAvailableWordSources.setData(undefined, [...previousData, data]);

      onSuccess();
    },
    onError() {
      toast.error('Failed to create datasource');
    },
  });
};

export const useUpdateWordSource = () => {
  const queryClient = trpc.useContext();
  return trpc.wordSources.updateWordSource.useMutation({
    onSuccess(data, { id }) {
      const previousData = queryClient.wordSources.getWordSourceByID.getData({ id });
      let type: 'shared' | 'private' = 'private';

      if (!previousData || !data) return;

      if (data.userAvailableSources.length !== 0) {
        type = 'shared';
      }
      const newData = { ...data, type };

      queryClient.wordSources.getWordSourceByID.setData({ id }, { ...previousData, ...newData });

      const previousWordSourceData = queryClient.wordSources.getAllUserAvailableWordSources.getData();

      if (!previousWordSourceData) return;
      const newWordSourceData = previousWordSourceData.map((e) => (e.id !== id ? e : { ...e, ...newData }));

      queryClient.wordSources.getAllUserAvailableWordSources.setData(undefined, newWordSourceData);

      toast.success('Source updates succesfuly');
    },
    onError() {
      toast.error('Failed to update datasource');
    },
  });
};

export const useDeleteWordSource = (onSuccess: () => void) => {
  const trpcContext = trpc.useContext();
  return trpc.wordSources.deleteWordSource.useMutation({
    onSuccess(_data, { id }) {
      const previousData = trpcContext.wordSources.getAllUserAvailableWordSources.getData();

      if (!previousData) return;
      const newData = previousData.filter((e) => e.id !== id);

      trpcContext.wordSources.getAllUserAvailableWordSources.setData(undefined, newData);

      onSuccess();
    },
    onError() {
      toast.error('Failed to delete word source');
    },
  });
};

export const useGetWordSourceWordPairs = (
  id: string,
  format?: { pagination: { page: number; perPage: number } } | { takeSkip: { skip: number; take: number } }
) => {
  return trpc.wordSources.getWordSourceWordPairs.useQuery(
    { sourceID: id ?? '', ...format },
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
