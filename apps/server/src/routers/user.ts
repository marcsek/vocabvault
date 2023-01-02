import { router, publicProcedure, privateProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRouter = router({
  greeting: publicProcedure.query(() => {
    return { greeting: 'nazdarecek' };
  }),
  getUser: privateProcedure.query(async (req) => {
    const user = await prisma.user.findUnique({
      where: { id: req.ctx.userID },
      select: { name: true, email: true, id: true, type: true, profileImage: true },
    });

    return user;
  }),
});
