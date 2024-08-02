import { TRPCError } from '@trpc/server';
import { removeAlikeWordSources } from './removeAlikeWordSources.js';
import { TChangeUserType } from '../../schemas/user.schema.js';
import { ExtendedPrismaClient } from '../../trpc/context.js';

export const updateUserType = async ({
  prisma,
  input,
  userId,
}: {
  prisma: ExtendedPrismaClient;
  input: TChangeUserType;
  userId: string;
}) => {
  try {
    if (input.type === 'adult') {
      const child = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          Child: { select: { parentId: true } },
        },
      });

      if (child?.Child?.parentId) {
        const data = await prisma.user.findUnique({
          where: { id: child.Child.parentId },
          select: { createdSources: { where: { userAvailableSources: { some: { userId } } }, select: { id: true } } },
        });

        if (!data) throw new TRPCError({ message: 'Failed to update user.', code: 'INTERNAL_SERVER_ERROR' });

        await removeAlikeWordSources({ prisma, input: { childId: userId, wordSourcesWithChildIds: data.createdSources } });
      }

      return await prisma.user.update({
        where: { id: userId },
        data: { type: 'ADULT', Child: { delete: true }, Parent: { create: {} } },
        select: { name: true, email: true, id: true, type: true, profileImage: true, socialId: true },
      });
    }
    if (input.type === 'child') {
      const child = await prisma.user.update({
        where: { id: userId },
        data: { type: 'CHILD', Parent: { delete: true }, Child: { create: {} } },
        select: {
          name: true,
          email: true,
          id: true,
          type: true,
          profileImage: true,
          socialId: true,
        },
      });

      return child;
    }
  } catch (e) {
    throw new TRPCError({ message: 'Failed to update user.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
