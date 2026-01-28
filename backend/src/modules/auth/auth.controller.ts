import type { NextFunction, Request, Response } from "express";
import type { User } from "@prisma/client";
import { created, ok } from "../../shared/utils/httpResponse";
import { AuthService } from "./auth.service";

type TokenUser = Pick<User, "id" | "username" | "fullname">;

export const AuthController = {
	register: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await AuthService.register(req.body);
			return created(res, result);
		} catch (error) {
			return next(error);
		}
	},
	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = (req as Request & { user?: TokenUser }).user;
			if (!user) {
				return next(new Error("Unauthorized"));
			}
			const result = AuthService.issueToken(user);
			return ok(res, result);
		} catch (error) {
			return next(error);
		}
	},
};
