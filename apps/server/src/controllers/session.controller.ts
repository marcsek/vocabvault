import { CreateSessionInput } from '../schemas/session.schema';
import { Context } from '../trpc/context';

export const createSessionController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: CreateSessionInput }) => {
  const history = await prisma.session.create({
    data: {
      user: { connect: { id: userID ?? '' } },
      startedAt: new Date(input.startedAt),
      endedAt: new Date(input.endedAt),
      type: input.type,
      SessionStatistics: {
        create: {
          accuracy: input.accuracy,
          correct: input.correct,
          incorrect: input.incorrect,
          maxStreak: input.maxStreak,
          minTries: input.minTries,
          totalTries: input.totalTries,
        },
      },
    },
  });

  return history;
};
