import type { NextFunction, Request, Response } from "express";
import { created, ok } from "../../shared/utils/httpResponse";
import { UsersService } from "./users.service";
import { PresenceService } from "../presence";

export const UsersController = {
	create: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await UsersService.create(req.body);
			return created(res, user);
		} catch (error) {
			return next(error);
		}
	},
	list: async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await UsersService.list();
			const onlineIds = new Set(PresenceService.listOnlineIds());
			const payload = users.map((user) => ({
				...user,
				online: onlineIds.has(user.id),
			}));
			return ok(res, payload);
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
