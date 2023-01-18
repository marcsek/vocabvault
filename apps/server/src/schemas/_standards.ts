import { z } from 'zod';

export const UserNameStandard = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters long')
  .max(25, 'Name cannot be longer than 25 characters');

export const UserPasswordStandard = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must have at least 8 characters')
  .max(40, 'Password is too long')
  .regex(/^(?=.*[A-Za-z])(?=.*[0-9]).*$/, 'Password must contain one digit');

export const EmailStandard = z.string({ required_error: 'Email is required' }).email('Enter a valid email').max(255, 'Email is too long');

export const WordSourceNameStandard = z
  .string({ required_error: 'Name is required' })
  .min(2, 'Name must be at least 2 characters long')
  .max(15, 'Name cannot be longer than 15 characters');
