import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const deleteWordSource = async ({ prisma, input }: { prisma: PrismaClient; input: { userId: string; wordSourceId: string } }) => {
  try {
    return await prisma.user.update({
      where: { id: input.userId },
      data: { createdSources: { delete: { id: input.wordSourceId } } },
    });
  } catch (e) {
    throw new TRPCError({ message: "Wasn't able to delete this record", code: 'INTERNAL_SERVER_ERROR' });
  }
};
