import { z } from 'zod';

export const LanguageDuoSchema = z.object({
  firstLanguage: z.object({ languageName: z.string(), code: z.string() }),
  secondLanguage: z.object({ languageName: z.string(), code: z.string() }),
});

export const createWordSourceSchema = z
  .object({ name: z.string(), file: z.string(), sharedWith: z.array(z.string()) })
  .merge(LanguageDuoSchema);

export type CreateWordSourceInput = z.TypeOf<typeof createWordSourceSchema>;
