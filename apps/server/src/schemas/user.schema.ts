import { z } from 'zod';
import { EmailStandard, UserNameStandard, UuidStandard } from './_standards';

export const UpdateUserSchema = z.object({
  name: UserNameStandard.optional(),
  email: EmailStandard.optional(),
});
export type TUpdateUserInput = z.TypeOf<typeof UpdateUserSchema>;

export const RemoveChildSchema = z.object({ childId: UuidStandard });
export type TRemoveChildInput = z.TypeOf<typeof RemoveChildSchema>;

export const AddChild = z.object({ socialId: z.number() });
export type TAddChildInput = z.TypeOf<typeof AddChild>;

export const ChangeUserTypeSchema = z.object({
  type: z.enum(['adult', 'child']),
});
export type TChangeUserType = z.TypeOf<typeof ChangeUserTypeSchema>;
