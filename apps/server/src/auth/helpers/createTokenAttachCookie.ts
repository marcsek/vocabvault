import e from 'express';
import { createAccessToken } from '../jwt.js';

export const createTokenAttachCookie = ({ res, userId }: { res: e.Response; userId: string }) => {
  const accessToken = createAccessToken({ userId: userId }, { expiresIn: '1h', allowInsecureKeySizes: true });

  res.cookie('jit', accessToken, {
    maxAge: 3_600_000,
    httpOnly: true,
    secure: false,
  });

  res.cookie('is_loggedin', 'yes', {
    maxAge: 3_600_000,
    httpOnly: false,
    secure: false,
  });

  return accessToken;
};
