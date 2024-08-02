import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const getUserParent = async ({ prisma, input }: { prisma: ExtendedPrismaClient; input: { email: string } | { id: string } }) => {
  try {
    return await prisma.user.findUnique({
      where: { ...input },
      select: { Child: { select: { parent: { select: { user: { select: { name: true, id: true, profileImage: true } } } } } } },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to perform search.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
