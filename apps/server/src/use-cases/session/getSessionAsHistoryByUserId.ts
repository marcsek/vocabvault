import { PrismaClient } from '@prisma/client';

const getSessionAsHistoryByUserId = async ({
  prisma,
  input,
}: {
  prisma: PrismaClient;
  input: { userID: string; skip: number | undefined; take: number | undefined };
}) => {
  return await prisma.user.findUnique({
    where: { id: input.userID },
    select: {
      _count: { select: { sessionHistory: true } },
      sessionHistory: {
        skip: input.skip,
        take: input.take,
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
};

export default getSessionAsHistoryByUserId;
