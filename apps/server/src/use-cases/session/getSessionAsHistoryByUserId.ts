import { PrismaClient } from '@prisma/client';

export type TOrderByObject = { startedAt?: 'desc' | 'asc'; type?: 'desc' | 'asc'; accuracy?: 'desc' | 'asc' };
export const getSessionAsHistoryByUserId = async ({
  prisma,
  input,
}: {
  prisma: PrismaClient;
  input: {
    userID: string;
    skip: number | undefined;
    take: number | undefined;
    orderBy: TOrderByObject;
    sourceId?: string;
    sessionType?: 'TEST' | 'PRACTICE';
  };
}) => {
  const SessionStatistics = input.orderBy.accuracy ? { accuracy: input.orderBy.accuracy } : undefined;

  const countQuery = prisma.session.count({ where: { userId: input.userID, wordSourceId: input.sourceId, type: input.sessionType } });

  const resultQuery = prisma.user.findUnique({
    where: { id: input.userID },
    select: {
      sessionHistory: {
        where: { wordSourceId: input.sourceId, type: input.sessionType },
        skip: input.skip,
        take: input.take,
        orderBy: { startedAt: input.orderBy.startedAt, type: input.orderBy.type, SessionStatistics },
        select: {
          wordSource: { select: { name: true } },
          startedAt: true,
          type: true,
          id: true,
          user: { select: { id: true, name: true } },
          SessionStatistics: { select: { accuracy: true } },
        },
      },
    },
  });
  const [count, results] = await prisma.$transaction([countQuery, resultQuery]);

  return { ...results, count };
};
