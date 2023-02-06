import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { removeAlikeWordSources } from './removeAlikeWordSources.js';

export const removeUsersChild = async ({ prisma, input }: { prisma: PrismaClient; input: { childId: string; parentId: string } }) => {
  try {
    const wordSourcesWithChildIds = await prisma.user.update({
      where: { id: input.parentId },
      data: { Parent: { update: { children: { disconnect: { userId: input.childId } } } } },
      select: { createdSources: { where: { userAvailableSources: { some: { userId: input.childId } } }, select: { id: true } } },
    });

    if (wordSourcesWithChildIds.createdSources.length === 0) return { id: input.childId };

    return await removeAlikeWordSources({
      prisma,
      input: { childId: input.childId, wordSourcesWithChildIds: wordSourcesWithChildIds.createdSources },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to remove child.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
