import { z } from 'zod';

export const loginUserSchema = z.object({ email: z.string().email('Not an email.'), password: z.string().min(8).max(40) });
export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(40)
    .regex(/^(?=.*\d)(?=.*[a-z]).{8,40}$/),
  name: z.string().min(2).max(25),
});

export type LoginInput = z.TypeOf<typeof loginUserSchema>;
export type RegisterInput = z.TypeOf<typeof registerUserSchema>;
