import { Context } from '../trpc/context';

export const getUserController = async ({ ctx: { prisma, userID } }: { ctx: Context }) => {
  const user = await prisma.user.findUnique({
    where: { id: userID ?? '' },
    select: { name: true, email: true, id: true, type: true, profileImage: true },
  });

  return user;
};
