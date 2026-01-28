import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import bcrypt from "bcryptjs";
import { UsersService } from "../modules/users/users.service";

type JwtPayload = {
	sub?: string;
	username?: string;
};

export const configurePassport = (): void => {
	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) {
		throw new Error("JWT_SECRET is not configured");
	}

	passport.use(
		new LocalStrategy(
			{ usernameField: "username", passwordField: "password" },
			async (username, password, done) => {
				try {
					const user = await UsersService.findAuthByUsername(username);
					if (!user) {
						return done(null, false, { message: "Invalid credentials" });
					}

					const matches = await bcrypt.compare(password, user.password);
					if (!matches) {
						return done(null, false, { message: "Invalid credentials" });
					}

					const { password: _password, ...safeUser } = user;
					return done(null, safeUser);
				} catch (error) {
					return done(error);
				}
			},
		),
	);

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: jwtSecret,
			},
			async (payload: JwtPayload, done) => {
				try {
					if (!payload.sub) {
						return done(null, false, { message: "Invalid token" });
					}
					const user = await UsersService.findById(payload.sub);
					if (!user) {
						return done(null, false, { message: "Invalid token" });
					}
					return done(null, user);
				} catch (error) {
					return done(error);
				}
			},
		),
	);
};
