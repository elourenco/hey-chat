import type { RequestHandler } from "express";
import passport from "passport";

export const requireAuth = passport.authenticate("jwt", {
	session: false,
}) as RequestHandler;
