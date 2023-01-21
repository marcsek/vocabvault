import { TRPCError } from '@trpc/server';
import { presentUserChildren, presentUserParent } from '../presenters/user';
import { TAddChildInput, TChangeUserType, TRemoveChildInput, TUpdateUserInput } from '../schemas/user.schema';
import { Context } from '../trpc/context';
import { addUsersChild, getUserChildren, getUserInfo, removeUsersChild, updateUserType } from '../use-cases/user';
import { getUserParent } from '../use-cases/user/getUserParent';
import { updateUser } from '../use-cases/user/updateUser';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await getUserInfo({ prisma, input: { id: userID ?? '' } });

  if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

  return user;
};

export const getUserParentController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const parent = await getUserParent({ prisma, input: { id: userID ?? '' } });

  if (!parent) throw new TRPCError({ message: 'Parent not found', code: 'NOT_FOUND' });

  return presentUserParent(parent);
};

export const getAllUserChildrenController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const children = await getUserChildren({ prisma, input: { id: userID ?? '' } });

  return presentUserChildren(children);
};

export const removeChildController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TRemoveChildInput }) => {
  return await removeUsersChild({ prisma, input: { childId: input.childId, parentId: userID ?? '' } });
};

export const addChildController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TAddChildInput }) => {
  const childToAdd = await addUsersChild({ prisma, input: { parentId: userID ?? '', socialId: input.socialId } });

  if (!childToAdd) throw new TRPCError({ message: 'Failed to add child.', code: 'INTERNAL_SERVER_ERROR' });

  return presentUserChildren(childToAdd);
};

export const updateUserController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateUserInput }) => {
  return await updateUser({ prisma, input, userId: userID ?? '' });
};

export const changeUserTypeController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TChangeUserType }) => {
  return await updateUserType({ prisma, userId: userID ?? '', input: { type: input.type } });
};
