import { router, privateProcedure } from '../trpc';
import { changeUserType, getUserController, updateUserController } from '../controllers/user.controller';
import { ChangeUserTypeSchema, UpdateUserSchema } from '../schemas/user.schema';

export const userRouter = router({
  getUser: privateProcedure.query((req) => getUserController({ ctx: req.ctx })),
  updateUser: privateProcedure.input(UpdateUserSchema).mutation((req) => updateUserController({ ctx: req.ctx, input: req.input })),
  changeType: privateProcedure.input(ChangeUserTypeSchema).mutation((req) => changeUserType({ ctx: req.ctx, input: req.input })),
});
