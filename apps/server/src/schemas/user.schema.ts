import { z } from 'zod';
import { EmailStandard, UserNameStandard, UuidStandard } from './_standards';

export const UpdateUserSchema = z.object({
  name: UserNameStandard.optional(),
  email: EmailStandard.optional(),
  children: z.array(UuidStandard).optional(),
  parent: UuidStandard.optional(),
});
export type TUpdateUserInput = z.TypeOf<typeof UpdateUserSchema>;

export const ChangeUserTypeSchema = z.object({
  type: z.enum(['adult', 'child']),
});
export type TChangeUserType = z.TypeOf<typeof ChangeUserTypeSchema>;
