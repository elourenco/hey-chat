import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export const configurePassport = (): void => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, _password, done) => {
        return done(null, false, { message: `Not implemented for ${email}` });
      }
    )
  );
};
