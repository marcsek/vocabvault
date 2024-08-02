import { TRPCError } from '@trpc/server';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const deleteWordSource = async ({
  prisma,
  input,
}: {
  prisma: ExtendedPrismaClient;
  input: { userId: string; wordSourceId: string };
}) => {
  try {
    return await prisma.user.update({
      where: { id: input.userId },
      data: { createdSources: { delete: { id: input.wordSourceId } } },
    });
  } catch (e) {
    throw new TRPCError({ message: "Wasn't able to delete this record", code: 'INTERNAL_SERVER_ERROR' });
  }
};
