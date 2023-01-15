import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { use } from 'passport';
import {
  CreateWordSourceInput,
  TDeleteWordSourceInput,
  TGetAllUserSourcesOutput,
  TGetSourceByIdOutputOutput,
  TGetWordSourceByIDInput,
  TGetWordSourceWordPairsInput,
  TUpdateWordSourceInput,
} from '../schemas/wordSource.schema';
import { Context } from '../trpc/context';

export const createWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: CreateWordSourceInput }) => {
  console.log(input);
  try {
    await prisma.wordSource.create({
      data: {
        documentType: 'excel',
        firstLanguage: {
          connectOrCreate: {
            where: { code: input.firstLanguage.code },
            create: { code: input.firstLanguage.code, languageName: input.firstLanguage.languageName },
          },
        },
        secondLanguage: {
          connectOrCreate: {
            where: { code: input.secondLanguage.code },
            create: { code: input.secondLanguage.code, languageName: input.secondLanguage.languageName },
          },
        },
        creator: { connect: { id: userID ?? '' } },
        name: input.name,
        wordPairs: {
          createMany: {
            data: input.wordPairs,
          },
        },
        userAvailableSources: {
          createMany: {
            data: input.sharedWith.map((e) => {
              return { userId: e };
            }),
          },
        },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST', cause: { prismaCode: e.code } });
    }
    throw new TRPCError({ message: 'Couldnt create record.', code: 'INTERNAL_SERVER_ERROR', cause: { error: e } });
  }

  return true;
};

export const getAllUserAvailableSourcesController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const result = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: {
      createdSources: {
        select: {
          id: true,
          createdAt: true,
          creator: { select: { id: true, profileImage: true, name: true } },
          name: true,
          firstLanguage: true,
          secondLanguage: true,
          documentType: true,
          userAvailableSources: { select: { user: { select: { profileImage: true, id: true, name: true } } } },
          wordPairs: { select: { firstValue: true, secondValue: true } },
        },
      },
      otherAvailableSources: {
        select: {
          wordSource: {
            select: {
              id: true,
              createdAt: true,
              creator: { select: { name: true, profileImage: true, id: true } },
              name: true,
              firstLanguage: true,
              secondLanguage: true,
              documentType: true,
              wordPairs: { select: { firstValue: true, secondValue: true } },
            },
          },
        },
      },
    },
  });

  const parsedCreatedSources: TGetAllUserSourcesOutput[] =
    result?.createdSources.map((e) => {
      return { ...e, type: !!e.userAvailableSources?.length ? 'shared' : 'private', createdAt: e.createdAt.toString() };
    }) ?? [];

  const parsedOtherSources: TGetAllUserSourcesOutput[] =
    result?.otherAvailableSources.map(({ wordSource: e }) => {
      return { ...e, type: 'watched', createdAt: e.createdAt.toString() };
    }) ?? [];

  return [...parsedCreatedSources, ...parsedOtherSources];
};

export const getWordSourceByIDController = async ({ ctx: { prisma }, input }: { ctx: Context; input: TGetWordSourceByIDInput }) => {
  let res: unknown;

  try {
    res = await prisma.wordSource.findUnique({
      where: { id: input.id },
      select: {
        name: true,
        id: true,
        firstLanguage: true,
        secondLanguage: true,
        userAvailableSources: { select: { user: { select: { name: true, id: true, profileImage: true } } } },
      },
    });
    if (!res) {
      //TODO:normalny error
      throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST' });
    }
  } catch (e) {
    //TODO:normalny error
    throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST' });
  }
  return res as TGetSourceByIdOutputOutput;
};

export const updateWordSourceController = async ({
  ctx: { prisma, userID },
  input: { id, ...input },
}: {
  ctx: Context;
  input: TUpdateWordSourceInput;
}) => {
  try {
    await prisma.user.update({
      where: { id: userID ?? '' },
      data: {
        createdSources: {
          update: {
            where: { id: id ?? '' },
            data: {
              name: input.name,
              firstLanguage: { connectOrCreate: { where: { code: input.firstLanguage.code }, create: { ...input.firstLanguage } } },
              secondLanguage: { connectOrCreate: { where: { code: input.secondLanguage.code }, create: { ...input.secondLanguage } } },
              //TODO: potom ked sa budu dat normalne selectovat userovia
              // userAvailableSources: {
              //   set: input.sharedWith.map((e) => {
              //     return { wordSourceId_userId: { userId: e, wordSourceId: id } };
              //   }),
              // },
            },
          },
        },
      },
    });
  } catch (e) {
    //TODO:normalny error
    console.log(e);
    throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST' });
  }

  return true;
};

export const deleteWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TDeleteWordSourceInput }) => {
  try {
    await prisma.user.update({ where: { id: userID ?? '' }, data: { createdSources: { delete: { id: input.id } } } });
  } catch (e) {
    //TODO:normalny error
    console.log(e);
    throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST' });
  }

  return true;
};

export const getWordSourceWordPairs = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TGetWordSourceWordPairsInput }) => {
  let skip = undefined;
  let take = undefined;

  if (input.pagination) {
    skip = input.pagination.page * input.pagination.perPage;
    take = input.pagination.perPage;
  }

  try {
    const res = await prisma.user.findUnique({
      where: { id: userID ?? '' },
      select: {
        createdSources: {
          where: { id: input.sourceID },
          select: {
            wordPairs: {
              skip,
              take,
              select: {
                id: true,
                firstValue: true,
                secondValue: true,
              },
            },
            _count: { select: { wordPairs: true } },
            secondLanguage: true,
            firstLanguage: true,
          },
        },
      },
    });
    return res?.createdSources[0];
  } catch (e) {}
};
