import { z } from 'zod';

export const LanguageDuoSchema = z.object({
  firstLanguage: z.object({ languageName: z.string(), code: z.string() }),
  secondLanguage: z.object({ languageName: z.string(), code: z.string() }),
});

export type TLanguageDuo = z.TypeOf<typeof LanguageDuoSchema>;

export const WordPairSchema = z.object({
  firstValue: z.string(),
  secondValue: z.string(),
});

export type TWordPair = z.TypeOf<typeof WordPairSchema>;

export const WordPairArraySchema = z.array(WordPairSchema).nonempty();
export const WordPairOptimizedArraySchema = z.object({ wordPairs: z.array(z.any()).nonempty() });

export type TWordPairArray = z.TypeOf<typeof WordPairArraySchema>;

export const createWordSourceSchema = z
  .object({ name: z.string(), wordPairs: WordPairArraySchema, sharedWith: z.array(z.string()) })
  .merge(LanguageDuoSchema);

export type CreateWordSourceInput = z.TypeOf<typeof createWordSourceSchema>;

export const GetAllUserSourcesOutputSchema = z.object({
  id: z.string(),
  type: z.enum(['private', 'shared', 'watched']),
  name: z.string(),
  createdAt: z.string(),
  firstLanguage: z.object({ languageName: z.string(), code: z.string() }),
  secondLanguage: z.object({ languageName: z.string(), code: z.string() }),
  documentType: z.string(),
  userAvailableSources: z.array(z.object({ user: z.object({ profileImage: z.string(), name: z.string(), id: z.string() }) })).optional(),
  wordPairs: z.array(WordPairSchema),
  creator: z.object({ id: z.string(), name: z.string(), profileImage: z.string().optional() }),
});

export type TGetAllUserSourcesOutput = z.TypeOf<typeof GetAllUserSourcesOutputSchema>;
