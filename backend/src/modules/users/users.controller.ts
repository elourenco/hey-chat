import type { NextFunction, Request, Response } from "express";
import { created, ok } from "../../shared/utils/httpResponse";
import { UsersService } from "./users.service";

export const UsersController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UsersService.create(req.body);
			return created(res, user);
		} catch (error) {
			return next(error);
		}
	},
	getById: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UsersService.findById(req.params.id);
			return ok(res, user);
		} catch (error) {
			return next(error);
		}
	},
};
