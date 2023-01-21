import { PrismaClient } from '@prisma/client';
import PassportGoogle from 'passport-google-oauth20';
import { generateSocialId } from '../../utils/generateSocialId';
import { parseAuthProviderProfile } from '../helpers/parseProfile';

const prisma = new PrismaClient();

const GoogleStrategy = new PassportGoogle.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: process.env.SERVER_URL + '/api/auth/google/callback',
  },
  async (_accessToken, _refreshToken, profile, done) => {
    const user = parseAuthProviderProfile({ profile });

    if (!user) return done(new Error('Received wrong profile data'));

    try {
      const { id: userID } = await prisma.user.upsert({
        where: { email: user.email },
        create: { email: user.email, name: user.name, profileImage: user.picture, Parent: { create: {} }, socialId: generateSocialId() },
        update: {},
        select: { id: true },
      });

      return done(null, userID);
    } catch (e) {
      return done(new Error('Error occured in google auth'));
    }
  }
);

export default GoogleStrategy;
