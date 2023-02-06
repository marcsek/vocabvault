import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

export const createDiceBearAvatar = async () => {
  const avatar = createAvatar(identicon, { seed: 'daco' });

  const avatarPng = avatar.png();

  return await avatarPng.toArrayBuffer();
};
