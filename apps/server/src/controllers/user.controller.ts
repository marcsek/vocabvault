import { TUpdateUserInput } from '../schemas/user.schema';
import { Context } from '../trpc/context';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: { name: true, email: true, id: true, type: true, profileImage: true },
  });

  return user;
};

export const updateUserController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateUserInput }) => {
  const { children, ...restOfInput } = input;

  const updatedUser = await prisma.user.update({
    where: { id: userID ?? '' },
    data: {
      Parent: {
        update: {
          children: {
            connect: children?.map((id) => {
              return { userId: id };
            }),
          },
        },
      },
      ...restOfInput,
    },
    //TODO: po update returnut aj child
    // select: { ...transformFields(restOfInput) },
    select: { name: true, email: true },
  });

  return updatedUser;
};
