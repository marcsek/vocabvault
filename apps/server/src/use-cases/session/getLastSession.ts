import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const getLastSession = async ({ prisma, userId }: { prisma: ExtendedPrismaClient; userId: string }) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        sessionHistory: {
          orderBy: { endedAt: 'desc' },
          take: 1,
          select: {
            endedAt: true,
            type: true,
            SessionStatistics: {
              select: {
                accuracy: true,
                correct: true,
              },
            },
            wordSource: {
              select: {
                name: true,
                firstLanguage: true,
                secondLanguage: true,
                creator: { select: { name: true, id: true, profileImage: true } },
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
