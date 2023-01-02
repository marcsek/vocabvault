import { Router } from 'express';
import googleRouter from './auth/google';
import githubRouter from './auth/github';

const expressRouter = Router();

expressRouter.use('/auth/google', googleRouter);
expressRouter.use('/auth/github', githubRouter);

export default expressRouter;
