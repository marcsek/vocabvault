import { router, privateProcedure } from '../trpc';
import { getUserController } from '../controllers/user.controller';

export const userRouter = router({
  getUser: privateProcedure.query((req) => getUserController({ ctx: req.ctx })),
});
