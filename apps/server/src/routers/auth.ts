import { router } from '../trpc/index.js';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/auth.controller.js';
import { loginUserSchema, registerUserSchema } from '../schemas/auth.schema.js';
import { privateProcedure, publicProcedure } from '../trpc/procedures.js';

export const authRouter = router({
  login: publicProcedure.input(loginUserSchema).mutation((req) => loginUserController({ ctx: req.ctx, loginInput: req.input })),
  register: publicProcedure.input(registerUserSchema).mutation((req) => registerUserController({ ctx: req.ctx, registerInput: req.input })),
  logout: privateProcedure.mutation((req) => logoutUserController({ ctx: req.ctx })),
});
