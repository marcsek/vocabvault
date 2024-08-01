import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'server/src/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
export type TContext = ReturnType<typeof trpc.useUtils>;
