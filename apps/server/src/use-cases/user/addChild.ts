import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const addUsersChild = async ({ prisma, input }: { prisma: ExtendedPrismaClient; input: { socialId: number; parentId: string } }) => {
  try {
    const childToAdd = await prisma.user.findUnique({
      where: { socialId: input.socialId },
      select: { type: true, id: true, Child: { select: { parentId: true } } },
    });

    if (childToAdd?.Child?.parentId) throw new TRPCError({ message: 'Child already has a parent.', code: 'BAD_REQUEST' });

    if (!childToAdd) throw new TRPCError({ message: 'Child not found.', code: 'NOT_FOUND' });

    if (childToAdd.type !== 'CHILD') throw new TRPCError({ message: "This social id doesn't belong to a child.", code: 'BAD_REQUEST' });

    return await prisma.user.update({
      where: { id: input.parentId },
      data: { Parent: { update: { children: { connect: { userId: childToAdd.id } } } } },
      select: { Parent: { select: { children: { select: { user: { select: { id: true, name: true, profileImage: true } } } } } } },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to remove child.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
