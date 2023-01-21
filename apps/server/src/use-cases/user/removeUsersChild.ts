import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const removeUsersChild = async ({ prisma, input }: { prisma: PrismaClient; input: { childId: string; parentId: string } }) => {
  try {
    const wordSourcesWithChildIds = await prisma.user.update({
      where: { id: input.parentId },
      data: { Parent: { update: { children: { disconnect: { userId: input.childId } } } } },
      select: { createdSources: { where: { userAvailableSources: { some: { userId: input.childId } } }, select: { id: true } } },
    });

    return await prisma.user.update({
      where: { id: input.childId },
      data: {
        otherAvailableSources: {
          deleteMany: wordSourcesWithChildIds.createdSources.map((e) => {
            return { userId: input.childId, wordSourceId: e.id };
          }),
        },
      },
      select: { id: true },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to remove child.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
