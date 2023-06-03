// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import db from "./models/cardModel.mjs";

// const GOOGLE_CLIENT_ID = '690723710272-armce29bojrgu44pp8niul49t60q7ujb.apps.googleusercontent.com'
// const GOOGLE_CLIENT_SECRET = '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'

// interface User {
//   google_id: string;
// }

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/oauth/google/callback",
//       passReqToCallback: true,
//     },
//     async (request, accessToken, refreshToken, profile, done) => {
//       console.log('request ' + request)
//       console.log(db)
//       const queryString = 'SELECT google_id, email, username FROM public.Users WHERE google_id = $1';
//       const values = [profile.id];
//       console.log('values: ', values);
//       const user = await db.query(queryString, values);
//       console.log('user: ', user)
//       let providerData = profile._json;
//       providerData.accessToken = accessToken;
//       providerData.refreshToken = refreshToken;
      
//       //SCENARIO 1: GOOGLE ID EXISTS
//       if (user.rows.length > 0) {
//         console.log("SCENARIO 1: Existing user row 0: ", user.rows[0]);
//         done(null, user.rows[0]);
//         return;
//       } 

//       const emailqueryString =
//         "SELECT id, google_id, email, username FROM public.Users WHERE email = $1";
//       const emailvalues = [profile.email]
//       const emailuser = await db.query(emailqueryString, emailvalues);
//       console.log('PRE SCENARIO 2')
//       console.log("emailuser rows: ", emailuser.rows);


//       //SCENARIO 2: GOOGLE ID DOES NOT EXIST BUT EMAIL EXISTS
//       if (emailuser.rows.length > 0 && !emailuser.rows[0].google_id) {
//         const newqueryString =
//           "UPDATE public.Users SET google_id = $1 WHERE email = $2";
//         const newValues = [profile.id, profile.email];
//         //UPDATE mytable
//         //SET google_id = 'new_value'
//         //WHERE google_id IS NULL;
//         await db.query(newqueryString, newValues);
//         const newemailuser = await db.query(emailqueryString, emailvalues);
//         console.log("SCENARIO 2: newUser row 0: ", newemailuser.rows[0]);
//         done(null, newemailuser.rows[0]);
//         return;
//       }

//       //SCENARIO 3: BOTH DO NOT EXIST
//       else {
//         const newqueryString =
//           "INSERT INTO public.Users (google_id, email, username) VALUES ($1,$2,$3) RETURNING id, google_id, email, username";
//         const newValues = [profile.id, profile.email, profile.given_name];
//         const newUser = await db.query(newqueryString, newValues);
//         console.log("SCENARIO 3: newUser row 0: ", newUser.rows[0]);
//         done(null, newUser.rows[0]);
//       }
// console.log('profile: ', profile)
//     }
//   )
// );

// passport.serializeUser(function (user: User, done) {
//   console.log("serializing user:", user);
//   done(null, user.google_id);
// });

// passport.deserializeUser(async function (userid, done) {
//   console.log("deserializing user id:", userid);
//   //another database call with user id
//   const desqueryString = 'SELECT id, google_id, email, username FROM public.Users WHERE google_id = $1';
//   const desvalues = [userid];
//   const desuser = await db.query(desqueryString, desvalues);
//   done(null, desuser.rows[0]);
// });
// export default passport;
