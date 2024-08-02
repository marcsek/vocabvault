import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const hashExtension = Prisma.defineExtension({
  name: 'hash-extension',
  query: {
    user: {
      async create(params) {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(params.args.data.password ?? '', salt);
        params.args.data.password = hash;

        return params.query(params.args);
      },
    },
  },
});
