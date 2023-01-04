import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters long')
    .max(25, 'Name cannot be longer than 25 characters'),
  email: z.string({ required_error: 'Email is required' }).email('Enter a valid email').max(255, 'Email is too long'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must have at least 8 characters')
    .max(40, 'Password is too long')
    .regex(/^(?=.*[A-Za-z])(?=.*[0-9]).*$/, 'Password must contain one digit'),
});

export const loginUserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Enter a valid email').max(255, 'Email is too long'),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Must have at least 8 characters').max(40, 'Password is too long'),
});

export type LoginInput = z.TypeOf<typeof loginUserSchema>;
export type RegisterInput = z.TypeOf<typeof registerUserSchema>;
