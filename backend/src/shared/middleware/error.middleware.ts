import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
): Response => {
	const message = error instanceof Error ? error.message : "Unknown error";
	return res.status(500).json({ message });
};
