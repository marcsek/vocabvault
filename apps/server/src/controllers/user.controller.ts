import { Context } from '../trpc/context';
import { LoginInput, RegisterInput } from '../schemas/user.schema';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { createTokenAttachCookie } from '../auth/helpers/createTokenAttachCookie';
import { Prisma } from '@prisma/client';

export const loginUserController = async ({ ctx: { prisma, res }, loginInput }: { ctx: Context; loginInput: LoginInput }) => {
  let user;
  try {
    user = await prisma.user.findUnique({ where: { email: loginInput.email }, select: { id: true, password: true } });
  } catch (e) {
    throw new TRPCError({ message: 'Failed to perform search', code: 'INTERNAL_SERVER_ERROR' });
  }

  if (!user) throw new TRPCError({ message: 'Wrong credentials', code: 'NOT_FOUND' });

  const passwordIsValid = await bcrypt.compare(loginInput.password, user?.password ?? '');

  if (!passwordIsValid) throw new TRPCError({ message: 'Wrong credentials', code: 'NOT_FOUND' });

  const accessToken = createTokenAttachCookie({ res, userId: user.id });
  return `success ${accessToken}`;
};

export const registerUserController = async ({ ctx: { prisma, res }, registerInput }: { ctx: Context; registerInput: RegisterInput }) => {
  let createdUser;
  const { email, name, password } = registerInput;

  try {
    createdUser = await prisma.user.create({
      data: { email, name, password, profileImage: 'default', Parent: { create: {} } },
      select: { id: true },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new TRPCError({ message: 'User already exists.', code: 'FORBIDDEN' });
      }
    }
  }

  if (!createdUser) throw new TRPCError({ message: 'Failed to create user.', code: 'INTERNAL_SERVER_ERROR' });

  const accessToken = createTokenAttachCookie({ res, userId: createdUser.id });
  return `success ${accessToken}`;
};
