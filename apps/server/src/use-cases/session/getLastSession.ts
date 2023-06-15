import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const getLastSession = async ({ prisma, userId }: { prisma: PrismaClient; userId: string }) => {
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
