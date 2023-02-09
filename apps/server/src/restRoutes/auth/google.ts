import { Router } from 'express';
import passport from 'passport';
import { createTokenAttachCookie } from '../../auth/helpers/createTokenAttachCookie.js';

const googleRouter = Router();

googleRouter.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

googleRouter.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const userID = req.user as string;

  if (userID) {
    const accessToken = createTokenAttachCookie({ res, userId: userID });

    res.redirect(`${process.env.CLIENT_URL} + /auth/success`);
  }
});

export default googleRouter;
