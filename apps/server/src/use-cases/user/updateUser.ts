import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { TUpdateUserInput } from '../../schemas/user.schema.js';

export const updateUser = async ({ prisma, input, userId }: { prisma: PrismaClient; input: TUpdateUserInput; userId: string }) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: input,
      select: { name: true, email: true, id: true, type: true, profileImage: true, socialId: true },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to update user type.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
