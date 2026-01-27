import type { NextFunction, Request, Response } from "express";
import { created, ok } from "../../shared/utils/httpResponse";
import { MessagesService } from "./messages.service";

export const MessagesController = {
	send: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const message = await MessagesService.send(req.body);
			return created(res, message);
		} catch (error) {
			return next(error);
		}
	},
	list: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const messages = await MessagesService.listByUser(req.params.userId);
			return ok(res, messages);
		} catch (error) {
			return next(error);
		}
	},
};
