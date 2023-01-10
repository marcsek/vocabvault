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

export const GetAllUserSourcesSchema = z.object({
  userId: z.string().optional(),
});

export type TGetAllUserSources = z.TypeOf<typeof GetAllUserSourcesSchema>;
