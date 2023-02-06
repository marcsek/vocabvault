import { publicProcedure } from '../trpc/procedures.js';
import { authRouter } from './auth.js';
import { sessionRouter } from './session.js';
import { userRouter } from './user.js';
import { wordSourceRouter } from './wordSource.js';
import { generateProfilePicture } from '../utils/generateProfilePicture.js';
import { router } from '../trpc/index.js';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  wordSources: wordSourceRouter,
  session: sessionRouter,
  test: publicProcedure.query(async () => {
    const profileImage = await generateProfilePicture('daco');
    return profileImage;
  }),
});

export type AppRouter = typeof appRouter;
