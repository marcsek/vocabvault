import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const updateUserType = async ({
  prisma,
  input,
  userId,
}: {
  prisma: PrismaClient;
  input: { type: 'CHILD' | 'ADULT'; [key: string]: unknown };
  userId: string;
}) => {
  try {
    if (input.type === 'ADULT') {
      const parentId = await prisma.user.findUnique({ where: { id: userId }, select: { Child: { select: { parentId: true } } } });
      if (!parentId?.Child?.parentId) return;

      const data = await prisma.user.update({
        where: { id: parentId.Child.parentId },
        data: { type: 'ADULT', Child: { delete: true }, Parent: { create: {} } },
        select: { createdSources: { where: { userAvailableSources: { some: { userId } } } } },
      });
    }

    return await prisma.user.update({
      where: { id: userId },
      data: input,
      select: { name: true, email: true, id: true, type: true, profileImage: true, socialId: true },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to update user.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
