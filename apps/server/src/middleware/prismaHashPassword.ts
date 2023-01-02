import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const prismaHashPassword: Prisma.Middleware = async (params, next) => {
  if (params.model == 'User' && params.action == 'create') {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(params.args.data.password, salt);

    params.args.data.password = hash;
  }

  return next(params);
};
