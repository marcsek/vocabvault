import {
  createWordSourceController,
  getAllUserAvailableSourcesController,
  getWordSourceByIDController,
  updateWordSourceController,
  deleteWordSourceController,
  getWordSourceWordPairs,
} from '../controllers/wordSource.controller';
import {
  CreateWordSourceSchema,
  DeleteWordSourceSchema,
  GetWordSourceByIDShema,
  GetWordSourceWordPairsSchema,
  UpdateWordSourceSchema,
} from '../schemas/wordSource.schema';
import { router, privateProcedure } from '../trpc';

export const wordSourceRouter = router({
  createWordSource: privateProcedure
    .input(CreateWordSourceSchema)
    .mutation((req) => createWordSourceController({ ctx: req.ctx, input: req.input })),

  getAllUserAvailableWordSources: privateProcedure.query((req) => getAllUserAvailableSourcesController({ ctx: req.ctx })),
  getWordSourceByID: privateProcedure
    .input(GetWordSourceByIDShema)
    .query((req) => getWordSourceByIDController({ ctx: req.ctx, input: req.input })),

  updateWordSource: privateProcedure
    .input(UpdateWordSourceSchema)
    .mutation((req) => updateWordSourceController({ ctx: req.ctx, input: req.input })),

  deleteWordSource: privateProcedure
    .input(DeleteWordSourceSchema)
    .mutation((req) => deleteWordSourceController({ ctx: req.ctx, input: req.input })),

  getWordSourceWordPairs: privateProcedure
    .input(GetWordSourceWordPairsSchema)
    .query((req) => getWordSourceWordPairs({ ctx: req.ctx, input: req.input })),
});
