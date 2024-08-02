import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const getAllWordSources = async ({ prisma, userId }: { prisma: ExtendedPrismaClient; userId: string }) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
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
            _count: { select: { wordPairs: true } },
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
                _count: { select: { wordPairs: true } },
              },
            },
          },
        },
      },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to find record.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
