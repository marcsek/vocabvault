import { createSessionController, getSessionAsHistoryByUserIdController } from '../controllers/session.controller';
import { CreateSessionSchema, GetSessionByUserIdSchema } from '../schemas/session.schema';
import { router, privateProcedure } from '../trpc';

export const sessionRouter = router({
  createSession: privateProcedure.input(CreateSessionSchema).mutation((req) => createSessionController({ ctx: req.ctx, input: req.input })),
  getSessionAsHistoryByUserId: privateProcedure
    .input(GetSessionByUserIdSchema)
    .query((req) => getSessionAsHistoryByUserIdController({ ctx: req.ctx, input: req.input })),
});
