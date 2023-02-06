import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app.js';
import { createContext } from './trpc/context.js';
import './auth/passportSetup.js';
import restRoutes from './restRoutes/index.js';
const app = express();
const port = process.env.SERVER_PORT ?? 3001;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', restRoutes);
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
