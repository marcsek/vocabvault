import { createWordSource, getAllWordSources } from '../use-cases/wordSource';

type TPresentWordSourceInput = Awaited<ReturnType<typeof createWordSource>>;

type TWordSourceOutput =
  | Omit<TPresentWordSourceInput, '_count'> & {
      type: 'shared' | 'private' | 'watched';
      wordPairsCount: number;
    };

export const presentWordSource = (wordSourceToParse: TPresentWordSourceInput): TWordSourceOutput => {
  const { _count, ...rest } = wordSourceToParse;
  return {
    ...wordSourceToParse,
    type: rest.userAvailableSources?.length ? 'shared' : 'private',
    wordPairsCount: _count.wordPairs,
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
      wordPairsCount: _count.wordPairs,
    };
  });

  const parsedOtherSources: TWordSourceOutput[] = wordSourcesToParse.otherAvailableSources.map(({ wordSource: e }) => {
    const { _count, ...rest } = e;
    return { ...rest, type: 'watched', userAvailableSources: [], wordPairsCount: _count.wordPairs };
  });

  return [...parsedCreatedSources, ...parsedOtherSources];
};
