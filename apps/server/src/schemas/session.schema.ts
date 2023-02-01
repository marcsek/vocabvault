import { z } from 'zod';

export const CreateSessionSchema = z.object({
  startedAt: z.string(),
  endedAt: z.string(),
  type: z.enum(['TEST', 'PRACTICE']),
  correct: z.number().nonnegative(),
  incorrect: z.number().nonnegative(),
  maxStreak: z.number().nonnegative(),
  accuracy: z.number().nonnegative(),
  minTries: z.number().nonnegative(),
  totalTries: z.number().nonnegative(),
});

export type CreateSessionInput = z.TypeOf<typeof CreateSessionSchema>;
