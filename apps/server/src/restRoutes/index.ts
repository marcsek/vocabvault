import { Router } from 'express';
import googleRouter from './auth/google.js';
import githubRouter from './auth/github.js';

const expressRouter = Router();

expressRouter.use('/auth/google', googleRouter);
expressRouter.use('/auth/github', githubRouter);

export default expressRouter;
