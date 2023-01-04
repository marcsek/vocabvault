import { privateProcedure, publicProcedure, router } from '../trpc';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/user.controller';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';

export const authRouter = router({
  login: publicProcedure.input(loginUserSchema).mutation((req) => loginUserController({ ctx: req.ctx, loginInput: req.input })),
  register: publicProcedure.input(registerUserSchema).mutation((req) => registerUserController({ ctx: req.ctx, registerInput: req.input })),
  logout: privateProcedure.mutation((req) => logoutUserController({ ctx: req.ctx })),
});
