import { publicProcedure } from '../trpc/procedures.js';
import { authRouter } from './auth.js';
import { sessionRouter } from './session.js';
import { userRouter } from './user.js';
import { wordSourceRouter } from './wordSource.js';
import { generateProfilePicture } from '../utils/generateProfilePicture.js';
import { router } from '../trpc/index.js';
import { generateS3PresignedUrl } from '../s3/s3Provider.js';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  wordSources: wordSourceRouter,
  session: sessionRouter,
  test: publicProcedure.query(async () => {
    const profileImage = await generateProfilePicture();
    console.log(await generateS3PresignedUrl(profileImage));
    return profileImage;
  }),
});

export type AppRouter = typeof appRouter;
