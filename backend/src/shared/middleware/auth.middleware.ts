import type { NextFunction, Request, Response } from "express";

type AuthedRequest = Request & { user?: unknown };

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
): void | Response => {
	const user = (req as AuthedRequest).user;
	if (!user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	next();
};
