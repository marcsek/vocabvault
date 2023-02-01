import { createSessionController } from '../controllers/session.controller';
import { CreateSessionSchema } from '../schemas/session.schema';
import { router, privateProcedure } from '../trpc';

export const sessionRouter = router({
  createSession: privateProcedure.input(CreateSessionSchema).mutation((req) => createSessionController({ ctx: req.ctx, input: req.input })),
});
