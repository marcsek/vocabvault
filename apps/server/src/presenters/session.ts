import { getLastSession, getSessionAsHistoryByUserId } from '../use-cases/session/index.js';

type TPresentSessionHistoryInput = Awaited<ReturnType<typeof getSessionAsHistoryByUserId>>;

export const presentSessionHistory = (sessionToParse: TPresentSessionHistoryInput) => {
  const actualSession = sessionToParse?.sessionHistory;

  if (!actualSession) return null;

  return {
    sessions: actualSession.map((e) => ({ ...e, startedAt: e.startedAt.toString() })),
    sessionCount: sessionToParse.count,
  };
};

type TPresentLatestWordSource = Awaited<ReturnType<typeof getLastSession>>;
export const presentLastSession = (latestWordSource: TPresentLatestWordSource) => {
  if (!latestWordSource) return undefined;

  const source = latestWordSource.sessionHistory[0];

  return {
    latestSession: { ...source.wordSource, accuracy: source.SessionStatistics?.accuracy, endedAt: source.endedAt, type: source.type },
  };
};
