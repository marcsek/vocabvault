import { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { CreateWordSourceInput } from '../../schemas/wordSource.schema';

export const createWordSource = async ({
  prisma,
  input,
  userId,
}: {
  prisma: PrismaClient;
  input: CreateWordSourceInput;
  userId: string;
}) => {
  try {
    return await prisma.wordSource.create({
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
        creator: { connect: { id: userId } },
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
      select: {
        id: true,
        createdAt: true,
        creator: { select: { id: true, profileImage: true, name: true } },
        name: true,
        firstLanguage: true,
        secondLanguage: true,
        documentType: true,
        userAvailableSources: { select: { user: { select: { profileImage: true, id: true, name: true } } } },
        _count: { select: { wordPairs: true } },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new TRPCError({ message: 'Couldnt create record.', code: 'BAD_REQUEST', cause: { prismaCode: e.code } });
    }
    throw new TRPCError({ message: 'Couldnt create record.', code: 'INTERNAL_SERVER_ERROR', cause: { error: e } });
  }
};
