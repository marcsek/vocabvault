import { router } from '../trpc';
import { authRouter } from './auth';
import { sessionRouter } from './session';
import { userRouter } from './user';
import { wordSourceRouter } from './wordSource';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  wordSources: wordSourceRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
