import passport from 'passport';
import GoogleStrategy from './passportStrategies/google.js';
import GithubStrategy from './passportStrategies/github.js';

passport.use(GoogleStrategy);
passport.use(GithubStrategy);

export default passport;
