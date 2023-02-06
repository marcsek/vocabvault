import { generateS3PresignedUrl } from '../s3/s3Provider.js';
import { createWordSource, getAllWordSources, updateWordSource } from '../use-cases/wordSource/index.js';

type TPresentWordSourceInput = Awaited<ReturnType<typeof createWordSource>>;

type TWordSourceOutput =
  | Omit<TPresentWordSourceInput, '_count' | 'createdAt' | 'userAvailableSources'> & {
      type: 'shared' | 'private' | 'watched';
      createdAt: string;
      wordPairsCount: number;
      userAvailableSources: { name: string; id: string; profileImage: string }[];
    };

export const presentWordSource = async (wordSourceToParse: TPresentWordSourceInput): Promise<TWordSourceOutput> => {
  const { _count, ...rest } = wordSourceToParse;
  return {
    ...wordSourceToParse,
    type: rest.userAvailableSources?.length ? 'shared' : 'private',
    createdAt: rest.createdAt.toString(),
    wordPairsCount: _count.wordPairs,
    userAvailableSources: await Promise.all(
      wordSourceToParse.userAvailableSources.map(async (e) => {
        return { id: e.user.id, name: e.user.name, profileImage: await generateS3PresignedUrl(e.user.profileImage) };
      })
    ),
  };
};

type TPresentAvailableWordSources = Awaited<ReturnType<typeof getAllWordSources>>;

export const presentAvailableWordSources = async (wordSourcesToParse: TPresentAvailableWordSources) => {
  if (!wordSourcesToParse) return [];

  const parsedCreatedSources: TWordSourceOutput[] = await Promise.all(
    wordSourcesToParse.createdSources.map(async (e) => {
      const { _count, ...rest } = e;
      return {
        ...rest,
        creator: { ...e.creator, profileImage: await generateS3PresignedUrl(e.creator.profileImage) },
        type: !!e.userAvailableSources?.length ? 'shared' : 'private',
        createdAt: rest.createdAt.toString(),
        wordPairsCount: _count.wordPairs,
        userAvailableSources: await Promise.all(
          e.userAvailableSources.map(async (e) => {
            return { id: e.user.id, name: e.user.name, profileImage: await generateS3PresignedUrl(e.user.profileImage) };
          })
        ),
      };
    })
  );

  const parsedOtherSources: TWordSourceOutput[] = await Promise.all(
    wordSourcesToParse.otherAvailableSources.map(async ({ wordSource: e }) => {
      const { _count, ...rest } = e;
      return {
        ...rest,
        creator: { ...e.creator, profileImage: await generateS3PresignedUrl(e.creator.profileImage) },
        type: 'watched',
        userAvailableSources: [],
        createdAt: rest.createdAt.toString(),
        wordPairsCount: _count.wordPairs,
      };
    })
  );

  return [...parsedCreatedSources, ...parsedOtherSources];
};

type TPresentUpdatedWordSource = Awaited<ReturnType<typeof updateWordSource>>;

export const presentUpdatedWordSource = async (wordSourceToParse: TPresentUpdatedWordSource) => {
  const toParse = wordSourceToParse.createdSources.at(0);

  if (!toParse) return null;

  const { userAvailableSources, ...rest } = toParse;
  return {
    ...rest,
    userAvailableSources: await Promise.all(
      userAvailableSources.map(async (e) => ({
        name: e.user.name,
        id: e.user.id,
        profileImage: await generateS3PresignedUrl(e.user.profileImage),
      }))
    ),
  };
};
