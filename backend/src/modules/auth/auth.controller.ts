import type { NextFunction, Request, Response } from "express";
import { created, ok } from "../../shared/utils/httpResponse";
import { AuthService } from "./auth.service";

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
			const result = await AuthService.login(req.body);
			return ok(res, result);
		} catch (error) {
			return next(error);
		}
	},
};
