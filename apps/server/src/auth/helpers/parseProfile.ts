import { z } from 'zod';
import PassportGoogle from 'passport-google-oauth20';
import PassportGithub from 'passport-github2';

const profileSchema = z.object({ name: z.string(), email: z.string().email(), picture: z.string() });

interface Props {
  profile: PassportGoogle.Profile | PassportGithub.Profile;
}

export const parseAuthProviderProfile = ({ profile }: Props) => {
  const userToParse = { name: profile.displayName, email: profile.emails?.at(0)?.value, picture: profile.photos?.at(0)?.value };

  try {
    return profileSchema.parse(userToParse);
  } catch (err) {
    return null;
  }
};
