import { Response, Request, Router, NextFunction } from 'express';
const router = Router();
import session from 'express-session';
import passport from 'passport';
import cookieController from '../controllers/cookieController.mjs';
// import '../oauth';

interface CustomRequest extends Request {
  user: any; // Update this type to match your user object if available
  logout: any;
  session: any;
}

// CREATES JWT & cookieSSID
router.get(
  "/JWT",
  (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('this is req from jwt')
    console.log(req.user);
    res.locals.id = cookieController.createJWToken({
      id: req.user._id,
      username: req.user.username,
    });
    console.log("req.user: ", req.user);
    next();
  },
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    res.redirect("/");
  }
);

//localhost8080/oauth/google
router.get(
  "/google",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("first authentication");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//localhost8080/oauth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8080/oauth/JWT",
    failureRedirect: "/oauth/google/failure",
  })
);

//localhost8080/oauth/protected FETCH THIS ROUTE FOR REQ.USER OAUTH USER INFO
router.get("/protected", passport.authenticate("google"), (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user) res.json(req.user);
  else res.json("oath user already logged out");
});

////localhost8080/oauth/google/failure
router.get("/google/failure",   (req: CustomRequest, res: Response, next: NextFunction) => {
  res.send("Failed to authenticate..");
});

//localhost8080/oauth/logout ROUTE FOR OAUTH USER SESSION LOG OUT
router.get("/logout",   (req: CustomRequest, res: Response, next: NextFunction) => {
  req.logout();
  req.session.destroy();
  res.send("Oauth User Logged Out!");
});

export default router;
