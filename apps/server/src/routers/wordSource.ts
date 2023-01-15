import {
  createWordSourceController,
  getAllUserAvailableSourcesController,
  getWordSourceByIDController,
  updateWordSourceController,
  deleteWordSourceController,
  getWordSourceWordPairs,
} from '../controllers/wordSource.controller';
import {
  createWordSourceSchema,
  deleteWordSourceSchema,
  GetWordSourceByIDShema,
  GetWordSourceWordPairsSchema,
  updateWordSourceSchema,
} from '../schemas/wordSource.schema';
import { router, privateProcedure } from '../trpc';

export const wordSourceRouter = router({
  createWordSource: privateProcedure
    .input(createWordSourceSchema)
    .mutation((req) => createWordSourceController({ ctx: req.ctx, input: req.input })),

  getAllUserAvailableWordSources: privateProcedure.query((req) => getAllUserAvailableSourcesController({ ctx: req.ctx })),
  getWordSourceByID: privateProcedure
    .input(GetWordSourceByIDShema)
    .query((req) => getWordSourceByIDController({ ctx: req.ctx, input: req.input })),

  updateWordSource: privateProcedure
    .input(updateWordSourceSchema)
    .mutation((req) => updateWordSourceController({ ctx: req.ctx, input: req.input })),

  deleteWordSource: privateProcedure
    .input(deleteWordSourceSchema)
    .mutation((req) => deleteWordSourceController({ ctx: req.ctx, input: req.input })),

  getWordSourceWordPairs: privateProcedure
    .input(GetWordSourceWordPairsSchema)
    .query((req) => getWordSourceWordPairs({ ctx: req.ctx, input: req.input })),
});
