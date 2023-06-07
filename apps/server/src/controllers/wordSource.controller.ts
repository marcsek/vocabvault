import { TRPCError } from '@trpc/server';
import {
  presentAvailableWordSources,
  presentLatestWordSource,
  presentUpdatedWordSource,
  presentWordSource,
} from '../presenters/wordSource.js';

import {
  CreateWordSourceInput,
  TDeleteWordSourceInput,
  TGetWordSourceByIDInput,
  TGetWordSourceWordPairsInput,
  TUpdateWordSourceInput,
} from '../schemas/wordSource.schema.js';
import { Context } from '../trpc/context.js';
import {
  createWordSource,
  deleteWordSource,
  getAllWordSources,
  getWordPairs,
  getWordSourceById,
  updateWordSource,
  getLatestWordSource,
} from '../use-cases/wordSource/index.js';

export const createWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: CreateWordSourceInput }) => {
  const newWordSource = await createWordSource({ prisma, input, userId: userID ?? '' });

  return await presentWordSource(newWordSource);
};

export const getAllUserAvailableSourcesController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const allWordSources = await getAllWordSources({ prisma, userId: userID ?? '' });

  if (!allWordSources) throw new TRPCError({ message: 'Failed to find record.', code: 'INTERNAL_SERVER_ERROR' });

  return await presentAvailableWordSources(allWordSources);
};

export const getWordSourceByIDController = async ({ ctx: { prisma }, input }: { ctx: Context; input: TGetWordSourceByIDInput }) => {
  const foundWordSource = await getWordSourceById({ prisma, wordSourceId: input.id });

  if (!foundWordSource) {
    throw new TRPCError({ message: 'Failed to find record.', code: 'INTERNAL_SERVER_ERROR' });
  }

  return await presentWordSource(foundWordSource);
};

export const getLatestWordSourceController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const latestWordSource = await getLatestWordSource({ prisma, userId: userID ?? '' });

  return presentLatestWordSource(latestWordSource);
};

export const updateWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateWordSourceInput }) => {
  const wordSourceToParse = await updateWordSource({ prisma, input, userId: userID ?? '' });

  return await presentUpdatedWordSource(wordSourceToParse);
};

export const deleteWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TDeleteWordSourceInput }) => {
  await deleteWordSource({ prisma, input: { userId: userID ?? '', wordSourceId: input.id } });

  return true;
};

export const getWordSourceWordPairs = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TGetWordSourceWordPairsInput }) => {
  let skip = input.takeSkip?.skip;
  let take = input.takeSkip?.take;

  if (input.pagination) {
    skip = input.pagination.page * input.pagination.perPage;
    take = input.pagination.perPage;
  }

  const wordPairs = await getWordPairs({ prisma, input: { skip, take, userId: userID ?? '', wordSourceId: input.sourceID } });

  if (!wordPairs) throw new TRPCError({ message: "Coldn't find any word pairs.", code: 'NOT_FOUND' });

  return wordPairs;
};
