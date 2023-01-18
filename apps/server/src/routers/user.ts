import { router, privateProcedure } from '../trpc';
import { getUserController, updateUserController } from '../controllers/user.controller';
import { UpdateUserSchema } from '../schemas/user.schema';

export const userRouter = router({
  getUser: privateProcedure.query((req) => getUserController({ ctx: req.ctx })),
  updateUser: privateProcedure.input(UpdateUserSchema).mutation((req) => updateUserController({ ctx: req.ctx, input: req.input })),
});
