import PassportGithub from 'passport-github2';
import { PrismaClient } from '@prisma/client';
// importing google because github strategy doesn't have type of done function in callback
import PassportGoogle from 'passport-google-oauth20';
import { parseAuthProviderProfile } from '../helpers/parseProfile.js';
import { generateSocialId } from '../../utils/generateSocialId.js';
import { generateProfilePicture } from '../../utils/generateProfilePicture.js';

const prisma = new PrismaClient();

const Github = new PassportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID ?? '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    callbackURL: process.env.SERVER_URL + '/api/auth/github/callback',
  },
  async (_accessToken: unknown, _refreshToken: unknown, profile: PassportGithub.Profile, done: PassportGoogle.VerifyCallback) => {
    const user = parseAuthProviderProfile({ profile });

    if (!user) return done(new Error('Received wrong profile data'));

    try {
      const profileImage = await generateProfilePicture();

      const { id: userID } = await prisma.user.upsert({
        where: { email: user.email },
        create: { email: user.email, name: user.name, profileImage: profileImage, Parent: { create: {} }, socialId: generateSocialId() },
        update: {},
        select: { id: true },
      });

      return done(null, userID);
    } catch (e) {
      return done(new Error('Error occured'));
    }
  }
);

export default Github;
