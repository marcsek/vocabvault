import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { TUpdateWordSourceInput } from '../../schemas/wordSource.schema';

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
              //TODO: potom ked sa budu dat normalne selectovat userovia
              // userAvailableSources: {
              //   set: input.sharedWith.map((e) => {
              //     return { wordSourceId_userId: { userId: e, wordSourceId: id } };
              //   }),
              // },
            },
          },
        },
      },
      select: { createdSources: { where: { id: input.id }, select: { name: true, firstLanguage: true, secondLanguage: true } } },
    });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to update record.', code: 'INTERNAL_SERVER_ERROR' });
  }
};
