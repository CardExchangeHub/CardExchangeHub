import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from 'express';

import 'dotenv/config';
import cardRoute from './routes/card_route.mjs';
import authRoute from './routes/auth_route.mjs';
import oauthRoute from './routes/oauthRoute.mjs';
// import cors from 'cors'; // Import the cors package

import passport from 'passport';
import session from 'express-session';
// import "./oauth";
//oauth code
// import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import db from './models/cardModel.mjs';

const GOOGLE_CLIENT_ID =
  '690723710272-armce29bojrgu44pp8niul49t60q7ujb.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

interface GoogleUser {
  google_id: string;
}
const app = express();
// app.use(cors());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// michelle
app.use(express.json());
app.use(urlencoded({ extended: true }));
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/oauth/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const queryString =
        'SELECT google_id, email, username FROM "public.Users" WHERE google_id = $1';
      const values = [profile.id];
      // console.log(profile)
      console.log('values: ', values);
      const user = await db.query(queryString, values);
      let providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      //SCENARIO 1: GOOGLE ID EXISTS
      if (user.rows.length > 0) {
        console.log('SCENARIO 1: Existing user row 0: ', user.rows[0]);
        done(null, user.rows[0]);
      } else {
        const emailqueryString =
          'SELECT id, google_id, email, username FROM "public.Users" WHERE email = $1';
        const emailvalues = [profile.email];
        const emailuser = await db.query(emailqueryString, emailvalues);
        console.log('PRE SCENARIO 2');
        console.log('emailuser rows: ', emailuser.rows);

        //SCENARIO 2: GOOGLE ID DOES NOT EXIST BUT EMAIL EXISTS
        if (emailuser.rows.length > 0 && !emailuser.rows[0].google_id) {
          const newqueryString =
            'UPDATE "public.Users" SET google_id = $1 WHERE email = $2';
          const newValues = [profile.id, profile.email];
          //UPDATE mytable
          //SET google_id = 'new_value'
          //WHERE google_id IS NULL;
          await db.query(newqueryString, newValues);
          const newemailuser = await db.query(emailqueryString, emailvalues);
          console.log('SCENARIO 2: newUser row 0: ', newemailuser.rows[0]);
          done(null, newemailuser.rows[0]);
        }

        //SCENARIO 3: BOTH DO NOT EXIST
        else {
          const newqueryString =
            'INSERT INTO "public.Users" (google_id, email, username) VALUES ($1,$2,$3) RETURNING id, google_id, email, username';
          const newValues = [profile.id, profile.email, profile.given_name];
          const newUser = await db.query(newqueryString, newValues);
          console.log('SCENARIO 3: newUser row 0: ', newUser.rows[0]);
          done(null, newUser.rows[0]);
        }
      }
    }
  )
);

//oauth code
app.get('/', (_req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
  next();
});
app.use('/api/auth', authRoute);
app.use('/api/card', cardRoute);
app.use('/api/oauth', oauthRoute);

const port = 3000;
//michelle

passport.serializeUser((user: GoogleUser, done) => {
  console.log('serializing user:', user.google_id);
  done(null, user.google_id);
});

passport.deserializeUser(async function (user: GoogleUser, done) {
  console.log('deserializing user id:', user);
  //another database call with user id
  const desqueryString =
    'SELECT id, google_id, email, username FROM "public.Users" WHERE google_id = $1';
  const desvalues = [user];
  const desuser = await db.query(desqueryString, desvalues);
  return done(null, desuser.rows[0]);
});
//michelle end

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  // eslint-disable-next-line no-console
  console.log(errorObj.log);

  return res.status(errorObj.status).json({
    message: errorObj.message,
  });
};

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
