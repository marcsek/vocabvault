import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const removeAlikeWordSources = async ({
  prisma,
  input,
}: {
  prisma: PrismaClient;
  input: { childId: string; wordSourcesWithChildIds: { id: string }[] };
}) => {
  try {
    if (input.wordSourcesWithChildIds === null) throw new TRPCError({ message: 'Failed to find parent.', code: 'BAD_REQUEST' });

    return await prisma.user.update({
      where: { id: input.childId },
      data: {
        otherAvailableSources: {
          deleteMany: input.wordSourcesWithChildIds.map((e) => {
            return { userId: input.childId, wordSourceId: e.id };
          }),
        },
      },
      select: { id: true },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to remove alike word sources.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
