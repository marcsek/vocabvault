import { initTRPC } from '@trpc/server';
import { Context } from './context';

export const t = initTRPC.context<Context>().create();
export type Tt = typeof t;

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

import { authMiddleware } from '../middleware/authMiddleware';
export const privateProcedure = publicProcedure.use(authMiddleware);
