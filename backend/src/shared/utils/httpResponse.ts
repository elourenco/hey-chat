import type { Response } from "express";

export const ok = <T>(res: Response, data: T): Response<T> =>
	res.status(200).json(data);

export const created = <T>(res: Response, data: T): Response<T> =>
	res.status(201).json(data);

export const fail = (res: Response, message: string, status = 400): Response =>
	res.status(status).json({ message });
