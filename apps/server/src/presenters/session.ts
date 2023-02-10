import getSessionAsHistoryByUserId from '../use-cases/session/getSessionAsHistoryByUserId.js';

type TPresentSessionHistoryInput = Awaited<ReturnType<typeof getSessionAsHistoryByUserId>>;

export const presentSessionHistory = (sessionToParse: TPresentSessionHistoryInput) => {
  const actualSession = sessionToParse?.sessionHistory;

  if (!actualSession) return null;

  return {
    sessions: actualSession.map((e) => ({ ...e, startedAt: e.startedAt.toString() })),
    sessionCount: sessionToParse.count,
  };
};
