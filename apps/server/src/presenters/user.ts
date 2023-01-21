import { getUserChildren } from '../use-cases/user';

type TPresentUserChildren = Awaited<ReturnType<typeof getUserChildren>>;

export const presentUserChildren = (childrenToParse: TPresentUserChildren) => {
  return childrenToParse?.Parent?.children.map((child) => {
    return { id: child.user.id, name: child.user.name, profilePicture: child.user.profileImage };
  });
};
