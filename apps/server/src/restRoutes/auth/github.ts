import { Router } from 'express';
import passport from 'passport';
import { createTokenAttachCookie } from '../../auth/helpers/createTokenAttachCookie';
import { createAccessToken } from '../../auth/jwt';

const githubRouter = Router();

githubRouter.get('/', passport.authenticate('github', { scope: ['email'], session: false }));

githubRouter.get('/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const userID = req.user as string;

  if (userID) {
    console.log(userID);
    const accessToken = createTokenAttachCookie({ res, userId: userID });
    res.status(200).send('Sucess');
  }
});

export default githubRouter;
