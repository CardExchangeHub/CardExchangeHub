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
router.get("/JWT", (req: CustomRequest, res: Response, next: NextFunction) => {
  cookieController.setSSIDCookie(req, res, next); // Include the 'next' argument
  console.log('this is req from jwt');
  console.log(req.user);
  // res.locals.id = cookieController.createJWToken({
  //   id: req.user.id,
  //   username: req.user.username,
  // });
  // console.log("req.user: ", req.user);
    // return res.redirect("http://localhost:8080");
    return res.redirect("http://localhost:8080/success");
});


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
    successRedirect: "/oauth/JWT",
    // successRedirect: "/",
    failureRedirect: "/oauth/google/failure",
  })
);

//localhost8080/oauth/protected FETCH THIS ROUTE FOR REQ.USER OAUTH USER INFO
router.get("/protected", (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful!",
      user: req.user,
    });
  } else {
    res.sendStatus(401);
  }
});

////localhost8080/oauth/google/failure
router.get("/google/failure",   (req: CustomRequest, res: Response, next: NextFunction) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  });
});

//localhost8080/oauth/logout ROUTE FOR OAUTH USER SESSION LOG OUT
router.get("/logout",   (req: CustomRequest, res: Response, next: NextFunction) => {
  req.logout();
  req.session.destroy();
  res.send("Oauth User Logged Out!");
});

export default router;
