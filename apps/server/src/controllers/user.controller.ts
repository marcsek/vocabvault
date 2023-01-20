import { TRPCError } from '@trpc/server';
import { TChangeUserType, TUpdateUserInput } from '../schemas/user.schema';
import { Context } from '../trpc/context';
import { getUserInfo } from '../use-cases/user';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await getUserInfo({ prisma, input: { id: userID ?? '' } });

  if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

  return user;
};

export const getUserChildren = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const children = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: { Parent: { select: { children: { select: { user: { select: { id: true, name: true, profileImage: true } } } } } } },
  });

  const parsedChildren = children?.Parent?.children.map((child) => {
    return { id: child.user.id, name: child.user.name, profilePicture: child.user.profileImage };
  });

  return parsedChildren;
};

export const updateUserController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateUserInput }) => {
  const { children, parent, ...restOfInput } = input;

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
