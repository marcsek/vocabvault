import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const getUserInfo = async ({ prisma, input }: { prisma: PrismaClient; input: { email: string } | { id: string } }) => {
  try {
    return await prisma.user.findUnique({
      where: { ...input },
      select: { name: true, email: true, id: true, type: true, profileImage: true },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to perform search', code: 'INTERNAL_SERVER_ERROR' });
  }
};
