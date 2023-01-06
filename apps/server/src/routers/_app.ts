import { router } from '../trpc';
import { authRouter } from './auth';
import { userRouter } from './user';
import { wordSourceRouter } from './wordSource';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  wordSources: wordSourceRouter,
});

export type AppRouter = typeof appRouter;
