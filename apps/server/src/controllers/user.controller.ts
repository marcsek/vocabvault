import { TChangeUserType, TUpdateUserInput } from '../schemas/user.schema';
import { Context } from '../trpc/context';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: { name: true, email: true, id: true, type: true, profileImage: true },
  });

  return user;
};

export const updateUserController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateUserInput }) => {
  const { children, type, parent, ...restOfInput } = input;

  const typeUpdateShape =
    type === 'adult'
      ? { type: 'ADULT', Child: { delete: true }, Parent: { create: {} } }
      : { type: 'CHILD', Parent: { delete: true }, Child: { create: {} } };

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
      Child: {
        update: {
          parent: {
            connect: {
              userId: parent,
            },
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

export const changeUserType = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TChangeUserType }) => {
  const typeUpdateShape: { type: 'CHILD' | 'ADULT'; [key: string]: unknown } =
    input.type === 'child'
      ? { type: 'CHILD', Parent: { delete: true }, Child: { create: {} } }
      : { type: 'ADULT', Child: { delete: true }, Parent: { create: {} } };

  const updatedUser = await prisma.user.update({
    where: { id: userID ?? '' },
    data: typeUpdateShape,
    //TODO: po update returnut aj child
    select: { name: true, email: true },
  });

  return updatedUser;
};
