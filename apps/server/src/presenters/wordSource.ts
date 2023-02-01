import { createWordSource, getAllWordSources, updateWordSource } from '../use-cases/wordSource';

type TPresentWordSourceInput = Awaited<ReturnType<typeof createWordSource>>;

type TWordSourceOutput =
  | Omit<TPresentWordSourceInput, '_count' | 'createdAt' | 'userAvailableSources'> & {
      type: 'shared' | 'private' | 'watched';
      createdAt: string;
      wordPairsCount: number;
      userAvailableSources: { name: string; id: string; profileImage: string }[];
    };

export const presentWordSource = (wordSourceToParse: TPresentWordSourceInput): TWordSourceOutput => {
  const { _count, ...rest } = wordSourceToParse;
  return {
    ...wordSourceToParse,
    type: rest.userAvailableSources?.length ? 'shared' : 'private',
    createdAt: rest.createdAt.toString(),
    wordPairsCount: _count.wordPairs,
    userAvailableSources: wordSourceToParse.userAvailableSources.map((e) => {
      return { id: e.user.id, name: e.user.name, profileImage: e.user.profileImage };
    }),
  };
};

type TPresentAvailableWordSources = Awaited<ReturnType<typeof getAllWordSources>>;

export const presentAvailableWordSources = (wordSourcesToParse: TPresentAvailableWordSources) => {
  if (!wordSourcesToParse) return [];

  const parsedCreatedSources: TWordSourceOutput[] = wordSourcesToParse.createdSources.map((e) => {
    const { _count, ...rest } = e;
    return {
      ...rest,
      type: !!e.userAvailableSources?.length ? 'shared' : 'private',
      createdAt: rest.createdAt.toString(),
      wordPairsCount: _count.wordPairs,
      userAvailableSources: rest.userAvailableSources.map((e) => {
        return { id: e.user.id, name: e.user.name, profileImage: e.user.profileImage };
      }),
    };
  });

  const parsedOtherSources: TWordSourceOutput[] = wordSourcesToParse.otherAvailableSources.map(({ wordSource: e }) => {
    const { _count, ...rest } = e;
    return {
      ...rest,
      type: 'watched',
      userAvailableSources: [],
      createdAt: rest.createdAt.toString(),
      wordPairsCount: _count.wordPairs,
    };
  });

  return [...parsedCreatedSources, ...parsedOtherSources];
};

type TPresentUpdatedWordSource = Awaited<ReturnType<typeof updateWordSource>>;

export const presentUpdatedWordSource = (wordSourceToParse: TPresentUpdatedWordSource) => {
  const toParse = wordSourceToParse.createdSources.at(0);

  if (!toParse) return null;

  const { userAvailableSources, ...rest } = toParse;
  return {
    ...rest,
    userAvailableSources: userAvailableSources.map((e) => ({ name: e.user.name, id: e.user.id, profileImage: e.user.profileImage })),
  };
};
