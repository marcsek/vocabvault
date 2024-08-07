import e from 'express';
import { createAccessToken } from '../jwt.js';

export const createTokenAttachCookie = ({ res, userId }: { res: e.Response; userId: string }) => {
  const accessToken = createAccessToken({ userId: userId }, { expiresIn: '7d', allowInsecureKeySizes: true });

  res.cookie('jit', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : undefined,
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN_NAME : undefined,
  });

  res.cookie('is_loggedin', 'yes', {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
    domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN_NAME : undefined,
  });

  return accessToken;
};
