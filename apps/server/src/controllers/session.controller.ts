import { presentLastSession, presentSessionHistory } from '../presenters/session.js';
import { CreateSessionInput, TGetSessionByUserIdInput } from '../schemas/session.schema.js';
import { Context } from '../trpc/context.js';
import { TOrderByObject } from '../use-cases/session/getSessionAsHistoryByUserId.js';
import { getLastSession, getSessionAsHistoryByUserId } from '../use-cases/session/index.js';

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

  const order = input.orderFilters.reverse ? 'asc' : 'desc';
  let orderObject: TOrderByObject = { accuracy: order };

  if (input.orderFilters.orderBy === 'time') {
    orderObject = { startedAt: order };
  } else if (input.orderFilters.orderBy === 'type') {
    orderObject = { type: order };
  }

  const history = await getSessionAsHistoryByUserId({
    prisma,
    input: {
      userID: idToFind,
      take,
      skip,
      orderBy: orderObject,
      sessionType: input.advancedFilters.sessionType,
      sourceId: input.advancedFilters.sourceId,
    },
  });

  return presentSessionHistory(history);
};

export const getLastSessionController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const latestWordSource = await getLastSession({ prisma, userId: userID ?? '' });

  return presentLastSession(latestWordSource);
};
