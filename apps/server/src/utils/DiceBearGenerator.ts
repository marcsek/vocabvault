import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import crypto from 'crypto';

export const createDiceBearAvatar = async (seed: string) => {
  const randomBytes = crypto.randomBytes(10).toString();

  const avatar = createAvatar(identicon, {
    backgroundType: ['gradientLinear'],
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
    rowColor: ['00acc1', '1e88e5', '5e35b1'],
    seed: seed + randomBytes,
  });
  //bfghgdfdsfdsfdssadsafdsadsaddsadsadsh

  const avatarPng = avatar.png();

  return await avatarPng.toArrayBuffer();
};
