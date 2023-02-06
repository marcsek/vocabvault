import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { TUpdateWordSourceInput } from '../../schemas/wordSource.schema.js';

export const updateWordSource = async ({
  prisma,
  userId,
  input,
}: {
  prisma: PrismaClient;
  input: TUpdateWordSourceInput;
  userId: string;
}) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        createdSources: {
          update: {
            where: { id: input.id },
            data: {
              name: input.name,
              firstLanguage: { connectOrCreate: { where: { code: input.firstLanguage.code }, create: { ...input.firstLanguage } } },
              secondLanguage: { connectOrCreate: { where: { code: input.secondLanguage.code }, create: { ...input.secondLanguage } } },
              userAvailableSources: {
                deleteMany: {},
                createMany: {
                  data: input.sharedWith.map((e) => {
                    return { userId: e };
                  }),
                },
              },
            },
          },
        },
      },
      select: {
        createdSources: {
          where: { id: input.id },
          select: {
            name: true,
            firstLanguage: true,
            secondLanguage: true,
            userAvailableSources: { select: { user: { select: { profileImage: true, id: true, name: true } } } },
          },
        },
      },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to update record.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
