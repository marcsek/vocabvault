import { createWordSourceController } from '../controllers/wordSource.controller';
import { createWordSourceSchema } from '../schemas/wordSource.schema';
import { router, privateProcedure } from '../trpc';

export const wordSourceRouter = router({
  createWordSource: privateProcedure
    .input(createWordSourceSchema)
    .mutation((req) => createWordSourceController({ ctx: req.ctx, input: req.input })),
});
