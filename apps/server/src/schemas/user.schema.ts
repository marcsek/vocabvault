import { z } from 'zod';
import { EmailStandard, UserNameStandard, UuidStandard } from './_standards';

export const UpdateUserSchema = z.object({
  name: UserNameStandard,
  email: EmailStandard,
  children: z.array(UuidStandard).optional(),
});

export type TUpdateUserInput = z.TypeOf<typeof UpdateUserSchema>;
