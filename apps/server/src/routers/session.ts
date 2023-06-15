import {
  createSessionController,
  getLastSessionController,
  getSessionAsHistoryByUserIdController,
} from '../controllers/session.controller.js';
import { CreateSessionSchema, GetSessionByUserIdSchema } from '../schemas/session.schema.js';
import { router } from '../trpc/index.js';
import { privateProcedure } from '../trpc/procedures.js';

export const sessionRouter = router({
  createSession: privateProcedure.input(CreateSessionSchema).mutation((req) => createSessionController({ ctx: req.ctx, input: req.input })),
  getSessionAsHistoryByUserId: privateProcedure
    .input(GetSessionByUserIdSchema)
    .query((req) => getSessionAsHistoryByUserIdController({ ctx: req.ctx, input: req.input })),
  getLastSession: privateProcedure.query((req) => getLastSessionController({ ctx: req.ctx })),
});
