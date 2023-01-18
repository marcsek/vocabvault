import { z } from 'zod';
import { EmailStandard, UserNameStandard, UserPasswordStandard } from './_standards';

export const registerUserSchema = z.object({
  name: UserNameStandard,
  email: EmailStandard,
  password: UserPasswordStandard,
});

export const loginUserSchema = z.object({
  email: EmailStandard,
  password: UserPasswordStandard,
});

export type LoginInput = z.TypeOf<typeof loginUserSchema>;
export type RegisterInput = z.TypeOf<typeof registerUserSchema>;
