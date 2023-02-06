import { z } from 'zod';
import { UuidStandard } from './_standards.js';

export const CreateSessionSchema = z.object({
  wordSourceId: z.string(),
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

export const GetSessionByUserIdSchema = z.object({
  userId: UuidStandard.optional(),
  orderFilters: z.object({ orderBy: z.enum(['percentage', 'time', 'type']), reverse: z.boolean() }),
  advancedFilters: z.object({ sourceId: UuidStandard.optional(), sessionType: z.enum(['TEST', 'PRACTICE']).optional() }),
  pagination: z.object({ page: z.number().nonnegative(), perPage: z.number().min(1).max(50) }).optional(),
});
export type TGetSessionByUserIdInput = z.TypeOf<typeof GetSessionByUserIdSchema>;
