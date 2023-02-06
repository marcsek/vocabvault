import { authMiddleware } from '../middleware/authMiddleware.js';
import { t } from './index.js';

export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
