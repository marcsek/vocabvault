import e from 'express';
import { createAccessToken } from '../jwt.js';

export const createTokenAttachCookie = ({ res, userId }: { res: e.Response; userId: string }) => {
  const accessToken = createAccessToken({ userId: userId }, { expiresIn: '7d', allowInsecureKeySizes: true });

  res.cookie('jit', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV === 'development' ? undefined : 'none',
    domain: process.env.NODE_ENV === 'development' ? undefined : process.env.DOMAIN_NAME,
  });

  res.cookie('is_loggedin', 'yes', {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV === 'development' ? undefined : 'none',
    domain: process.env.NODE_ENV === 'development' ? undefined : process.env.DOMAIN_NAME,
  });

  return accessToken;
};
