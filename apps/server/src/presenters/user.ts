import { getUserChildren } from '../use-cases/user';
import { getUserParent } from '../use-cases/user/getUserParent';

type TPresentUserChildren = Awaited<ReturnType<typeof getUserChildren>>;

export const presentUserChildren = (childrenToParse: TPresentUserChildren) => {
  return childrenToParse?.Parent?.children.map((child) => {
    return { id: child.user.id, name: child.user.name, profilePicture: child.user.profileImage };
  });
};

type TPresentUserParent = Awaited<ReturnType<typeof getUserParent>>;

export const presentUserParent = (parentToParse: TPresentUserParent) => {
  const parent = parentToParse?.Child?.parent?.user;

  if (!parent) return undefined;

  return { id: parent.id, name: parent.name, profileImage: parent.profileImage };
};
