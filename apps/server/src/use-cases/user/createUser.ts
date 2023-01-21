import { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { RegisterInput } from '../../schemas/auth.schema';
import { generateSocialId } from '../../utils/generateSocialId';

export const createUser = async ({ prisma, input }: { prisma: PrismaClient; input: RegisterInput }) => {
  try {
    return await prisma.user.create({
      data: { ...input, profileImage: 'default', Parent: { create: {} }, socialId: generateSocialId() },
      select: { id: true },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new TRPCError({ message: 'User already exists.', code: 'FORBIDDEN' });
      }
    }
  }
};
