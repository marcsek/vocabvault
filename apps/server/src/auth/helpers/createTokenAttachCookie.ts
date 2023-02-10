import e from 'express';
import { createAccessToken } from '../jwt.js';

export const createTokenAttachCookie = ({ res, userId }: { res: e.Response; userId: string }) => {
  const accessToken = createAccessToken({ userId: userId }, { expiresIn: '1h', allowInsecureKeySizes: true });

  res.cookie('jit', accessToken, {
    maxAge: 10000000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.cookie('is_loggedin', 'yes', {
    maxAge: 10000000,
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });

  return accessToken;
};
