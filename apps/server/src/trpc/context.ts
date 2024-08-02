import { PrismaClient } from '@prisma/client';
import { verifyAccessToken } from '../auth/jwt.js';
import type * as trpcExpress from '@trpc/server/adapters/express';
import { hashExtension } from '../extensions/prismaHashPassword.js';

const prisma = new PrismaClient().$extends(hashExtension);

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

export type Context = Awaited<ReturnType<typeof createContext>>;
export type ExtendedPrismaClient = typeof prisma;
