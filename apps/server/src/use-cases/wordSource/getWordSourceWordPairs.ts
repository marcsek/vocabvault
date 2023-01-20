import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const getWordPairs = async ({
  prisma,
  input,
}: {
  prisma: PrismaClient;
  input: { userId: string; wordSourceId: string; skip: number | undefined; take: number | undefined };
}) => {
  try {
    return await prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        createdSources: {
          where: { id: input.wordSourceId },
          select: {
            wordPairs: {
              skip: input.skip,
              take: input.take,
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
  } catch (e) {
    throw new TRPCError({ message: "Couldn't find word sources", code: 'INTERNAL_SERVER_ERROR' });
  }
};
