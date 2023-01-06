import { CreateWordSourceInput } from '../schemas/wordSource.schema';
import { Context } from '../trpc/context';

export const createWordSourceController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: CreateWordSourceInput }) => {
  try {
    await prisma.user.update({
      where: { id: userID ?? '' },
      data: {
        wordSource: {
          create: {
            documentType: 'excel',
            firstLanguage: {
              connectOrCreate: {
                where: { code: input.firstLanguage.code },
                create: { code: input.firstLanguage.code, languageName: input.firstLanguage.languageName },
              },
            },
            secondLanguage: {
              connectOrCreate: {
                where: { code: input.secondLanguage.code },
                create: { code: input.secondLanguage.code, languageName: input.secondLanguage.languageName },
              },
            },
            name: input.name,
            wordPairs: {
              createMany: {
                data: [
                  { firstValue: 'cau', secondValue: 'nazdar' },
                  { firstValue: 'akocau', secondValue: 'toIde' },
                ],
              },
            },
            usersWithAccess: { connect: { id: '91a73765-bb73-46e2-91a0-6631e0e61668' } },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }

  return 'done';
};
