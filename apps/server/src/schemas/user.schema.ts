import { z } from 'zod';
import { EmailStandard, UserNameStandard } from './_standards';

export const UpdateUserSchema = z.object({
  name: UserNameStandard,
  email: EmailStandard,
  children: z.array(z.string().uuid()).optional(),
});

export type TUpdateUserInput = z.TypeOf<typeof UpdateUserSchema>;
