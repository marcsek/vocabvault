import { Context } from '../trpc/context';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { createTokenAttachCookie } from '../auth/helpers/createTokenAttachCookie';
import { findUser, createUser } from '../use-cases/user';

export const loginUserController = async ({ ctx: { prisma, res }, loginInput }: { ctx: Context; loginInput: LoginInput }) => {
  const user = await findUser({ prisma, input: { email: loginInput.email } });

  if (!user) throw new TRPCError({ message: 'Wrong credentials', code: 'NOT_FOUND' });

  const passwordIsValid = await bcrypt.compare(loginInput.password, user?.password ?? '');

  if (!passwordIsValid) throw new TRPCError({ message: 'Wrong credentials', code: 'NOT_FOUND' });

  const accessToken = createTokenAttachCookie({ res, userId: user.id });
  return `success ${accessToken}`;
};

export const registerUserController = async ({ ctx: { prisma, res }, registerInput }: { ctx: Context; registerInput: RegisterInput }) => {
  const createdUser = await createUser({ prisma, input: registerInput });

  if (!createdUser) throw new TRPCError({ message: 'Failed to create user.', code: 'INTERNAL_SERVER_ERROR' });

  const accessToken = createTokenAttachCookie({ res, userId: createdUser.id });
  return `success ${accessToken}`;
};

export const logoutUserController = async ({ ctx: { req, res } }: { ctx: Context }) => {
  if (!req.cookies.jit) {
    throw new TRPCError({ message: "Can't logout without token", code: 'BAD_REQUEST' });
  }

  res.clearCookie('jit');
  res.clearCookie('is_loggedin');

  return 'sucess';
};
