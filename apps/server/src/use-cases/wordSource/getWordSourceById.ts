import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const getWordSourceById = async ({ prisma, wordSourceId }: { prisma: PrismaClient; wordSourceId: string }) => {
  try {
    return await prisma.wordSource.findUnique({
      where: { id: wordSourceId },
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
    throw new TRPCError({ message: 'Failed to find record.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
