import passport from 'passport';
import GoogleStrategy from './passportStrategies/google';
import GithubStrategy from './passportStrategies/github';

passport.use(GoogleStrategy);
passport.use(GithubStrategy);

export default passport;
