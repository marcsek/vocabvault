import { z } from 'zod';
import { toFormikValidationSchema } from '../../../utils/helpers/zodToFormik';

export const LanguageDuoSchema = z.object({
  lang1: z.object({ language: z.string(), code: z.string() }),
  lang2: z.object({ language: z.string(), code: z.string() }),
});

export type TLanguageDuo = z.TypeOf<typeof LanguageDuoSchema>;

export const DataResourceSchema = z
  .object({
    name: z.string(),
    file: z.instanceof(File),
    sharedWith: z.array(z.object({ id: z.string(), name: z.string(), profilePicture: z.string() })),
  })
  .merge(LanguageDuoSchema);

export const FormikDataResourceSchema = toFormikValidationSchema(DataResourceSchema);
