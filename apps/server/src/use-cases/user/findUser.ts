import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const findUser = async ({ prisma, input }: { prisma: PrismaClient; input: { email: string } | { id: string } }) => {
  try {
    return await prisma.user.findUnique({ where: { ...input }, select: { id: true, password: true } });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to perform search', code: 'INTERNAL_SERVER_ERROR' });
  }
};
