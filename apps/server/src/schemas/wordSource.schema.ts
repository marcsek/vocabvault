import { z } from 'zod';
import { UuidStandard, WordSourceNameStandard } from './_standards';

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

export const SharedWithSchema = z.array(UuidStandard);
export type TSharedWithArray = z.TypeOf<typeof SharedWithSchema>;

export const CreateWordSourceSchema = z
  .object({ name: WordSourceNameStandard, wordPairs: WordPairArraySchema, sharedWith: SharedWithSchema })
  .merge(LanguageDuoSchema);
export type CreateWordSourceInput = z.TypeOf<typeof CreateWordSourceSchema>;

export const UpdateWordSourceSchema = z
  .object({ id: UuidStandard, name: WordSourceNameStandard, sharedWith: SharedWithSchema })
  .merge(LanguageDuoSchema);
export type TUpdateWordSourceInput = z.TypeOf<typeof UpdateWordSourceSchema>;

export const DeleteWordSourceSchema = z.object({ id: UuidStandard });
export type TDeleteWordSourceInput = z.TypeOf<typeof DeleteWordSourceSchema>;

export const UserAvailableSourcesSchema = z.array(
  z.object({ user: z.object({ profileImage: z.string(), name: z.string(), id: z.string() }) })
);

export const GetWordSourceByIDShema = z.object({ id: UuidStandard });
export type TGetWordSourceByIDInput = z.TypeOf<typeof GetWordSourceByIDShema>;

export const GetWordSourceWordPairsSchema = z.object({
  sourceID: UuidStandard,
  pagination: z.object({ page: z.number().nonnegative(), perPage: z.number().min(1).max(50) }).optional(),
  takeSkip: z.object({ take: z.number().nonnegative(), skip: z.number().nonnegative() }).optional(),
});
export type TGetWordSourceWordPairsInput = z.TypeOf<typeof GetWordSourceWordPairsSchema>;
