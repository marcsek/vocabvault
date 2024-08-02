import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const getUserStats = async ({ prisma, userId }: { prisma: ExtendedPrismaClient; userId: string }) => {
  const todayYearAgo = new Date().setFullYear(new Date().getFullYear() - 1);

  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        sessionHistory: {
          where: { endedAt: { gt: new Date(todayYearAgo) } },
          orderBy: { endedAt: 'asc' },
          select: {
            wordSource: {
              select: {
                name: true,
              },
            },
            endedAt: true,
            startedAt: true,
            SessionStatistics: {
              select: {
                accuracy: true,
              },
            },
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
    throw new TRPCError({ message: 'Failed to find record.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
