import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { CreateWordSourceInput, TGetAllUserSources } from '../schemas/wordSource.schema';
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
          create: { userId: '3e087aa0-7542-4646-9e6f-c996ed5f0627' },
          // createMany: {
          //   data: input.sharedWith.map((e) => {
          //     return { userId: e };
          //   }),
          // },
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

export const getAllUserAvailableSourcesController = async ({
  ctx: { prisma, userID },
  input,
}: {
  ctx: Context;
  input: TGetAllUserSources;
}) => {
  const result = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: {
      createdSources: {
        select: {
          createdAt: true,
          creator: { select: { id: true, name: true } },
          name: true,
          firstLanguage: true,
          secondLanguage: true,
          documentType: true,
          userAvailableSources: { select: { user: { select: { profileImage: true } } } },
          wordPairs: { select: { firstValue: true, secondValue: true } },
        },
      },
      otherAvailableSources: {
        select: {
          wordSource: {
            select: {
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

  console.log(result);
  return result;
};
