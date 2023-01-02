import { PrismaClient } from '@prisma/client';
import { verifyAccessToken } from '../auth/jwt';
import type * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';
import { prismaHashPassword } from '../middleware/prismaHashPassword';

const prisma = new PrismaClient();
prisma.$use(prismaHashPassword);

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const token = req.cookies.jit;

  function getUser() {
    if (token) {
      const payload: { userId: string } | null = verifyAccessToken(token);
      if (payload?.userId) {
        return payload.userId;
      }
    }
    return null;
  }

  const userID = getUser();

  return { req, res, prisma, userID };
};

export type Context = inferAsyncReturnType<typeof createContext>;
