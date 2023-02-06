import { TRPCError } from '@trpc/server';
import { generateUserProfileImageUrl, presentUserChildren, presentUserParent } from '../presenters/user.js';
import { TAddChildInput, TChangeUserType, TRemoveChildInput, TUpdateUserInput } from '../schemas/user.schema.js';
import { Context } from '../trpc/context.js';
import { addUsersChild, getUserChildren, getUserInfo, removeUsersChild, updateUserType } from '../use-cases/user/index.js';
import { getUserParent } from '../use-cases/user/getUserParent.js';
import { updateUser } from '../use-cases/user/updateUser.js';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await getUserInfo({ prisma, input: { id: userID ?? '' } });

  if (!user) throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });

  const userWithPresignedUrl = await generateUserProfileImageUrl(user);

  return userWithPresignedUrl;
};

export const getUserParentController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const parent = await getUserParent({ prisma, input: { id: userID ?? '' } });

  if (!parent) throw new TRPCError({ message: 'Parent not found', code: 'NOT_FOUND' });

  return await presentUserParent(parent);
};

export const getAllUserChildrenController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const children = await getUserChildren({ prisma, input: { id: userID ?? '' } });

  return await presentUserChildren(children);
};

export const removeChildController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TRemoveChildInput }) => {
  return await removeUsersChild({ prisma, input: { childId: input.childId, parentId: userID ?? '' } });
};

export const addChildController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TAddChildInput }) => {
  const childToAdd = await addUsersChild({ prisma, input: { parentId: userID ?? '', socialId: input.socialId } });

  if (!childToAdd) throw new TRPCError({ message: 'Failed to add child.', code: 'INTERNAL_SERVER_ERROR' });

  return await presentUserChildren(childToAdd);
};

export const updateUserController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TUpdateUserInput }) => {
  const updatedUser = await updateUser({ prisma, input, userId: userID ?? '' });

  return await generateUserProfileImageUrl(updatedUser);
};

export const changeUserTypeController = async ({ ctx: { prisma, userID }, input }: { ctx: Context; input: TChangeUserType }) => {
  return await updateUserType({ prisma, userId: userID ?? '', input: { type: input.type } });
};
