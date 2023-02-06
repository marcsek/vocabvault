import { getUserChildren } from '../use-cases/user/index.js';
import { getUserParent } from '../use-cases/user/getUserParent.js';
import { generateS3PresignedUrl } from '../s3/s3Provider.js';

type TPresentUserChildren = Awaited<ReturnType<typeof getUserChildren>>;

export const presentUserChildren = async (childrenToParse: TPresentUserChildren) => {
  const parsedChildren = childrenToParse?.Parent?.children.map(async (child) => {
    const profileImage = await generateS3PresignedUrl(child.user.profileImage);

    return { id: child.user.id, name: child.user.name, profileImage };
  });

  if (!parsedChildren) return;

  return await Promise.all(parsedChildren);
};

type TPresentUserParent = Awaited<ReturnType<typeof getUserParent>>;

export const presentUserParent = async (parentToParse: TPresentUserParent) => {
  const parent = parentToParse?.Child?.parent?.user;

  if (!parent) return undefined;

  const profileImage = await generateS3PresignedUrl(parent.profileImage);

  return { id: parent.id, name: parent.name, profileImage: profileImage };
};

export const generateUserProfileImageUrl = async <T extends { profileImage: string }>(user: T) => {
  const signedUrl = await generateS3PresignedUrl(user.profileImage);

  return { ...user, profileImage: signedUrl };
};
