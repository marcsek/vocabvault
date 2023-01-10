import { createWordSourceController, getAllUserAvailableSourcesController } from '../controllers/wordSource.controller';
import { createWordSourceSchema, GetAllUserSourcesSchema } from '../schemas/wordSource.schema';
import { router, privateProcedure } from '../trpc';

export const wordSourceRouter = router({
  createWordSource: privateProcedure
    .input(createWordSourceSchema)
    .mutation((req) => createWordSourceController({ ctx: req.ctx, input: req.input })),

  getAllUserAvailableWordSources: privateProcedure
    .input(GetAllUserSourcesSchema)
    .mutation((req) => getAllUserAvailableSourcesController({ ctx: req.ctx, input: req.input })),
});
