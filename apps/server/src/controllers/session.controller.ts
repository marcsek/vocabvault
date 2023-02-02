import { presentSessionHistory } from '../presenters/session';
import { CreateSessionInput, TGetSessionByUserIdInput } from '../schemas/session.schema';
import { Context } from '../trpc/context';
import getSessionAsHistoryByUserId from '../use-cases/session/getSessionAsHistoryByUserId';

export const createSessionController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: CreateSessionInput }) => {
  const history = await prisma.session.create({
    data: {
      user: { connect: { id: userID ?? '' } },
      wordSource: { connect: { id: input.wordSourceId } },
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

export const getSessionAsHistoryByUserIdController = async ({
  ctx: { prisma, userID },
  input,
}: {
  ctx: Context;
  input: TGetSessionByUserIdInput;
}) => {
  const idToFind = input.userId ?? userID ?? '';
  let skip, take;

  if (input.pagination) {
    skip = input.pagination.page * input.pagination.perPage;
    take = input.pagination.perPage;
  }

  const history = await getSessionAsHistoryByUserId({ prisma, input: { userID: idToFind, take, skip } });

  return presentSessionHistory(history);
};
