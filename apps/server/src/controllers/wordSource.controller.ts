import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { CreateWordSourceInput } from '../schemas/wordSource.schema';
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

  return 'done';
};
