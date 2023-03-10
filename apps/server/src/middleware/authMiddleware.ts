import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc/index.js';

export const authMiddleware = middleware(async ({ ctx: { userID }, next }) => {
  if (!userID) {
    throw new TRPCError({ message: 'Not authenticated', code: 'UNAUTHORIZED' });
  }

  return next({ ctx: { userID } });
});
