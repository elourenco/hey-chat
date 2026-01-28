import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

type SchemaGroup = {
	body?: ZodTypeAny;
	params?: ZodTypeAny;
	query?: ZodTypeAny;
};

export const validate = (schemas: SchemaGroup): RequestHandler => {
	return (req, res, next) => {
		if (schemas.body) {
			const result = schemas.body.safeParse(req.body);
			if (!result.success) {
				return res.status(400).json({
					message: "Invalid request body",
					issues: result.error.issues,
				});
			}
			req.body = result.data;
		}

		if (schemas.params) {
			const result = schemas.params.safeParse(req.params);
			if (!result.success) {
				return res.status(400).json({
					message: "Invalid request params",
					issues: result.error.issues,
				});
			}
			req.params = result.data as typeof req.params;
		}

		if (schemas.query) {
			const result = schemas.query.safeParse(req.query);
			if (!result.success) {
				return res.status(400).json({
					message: "Invalid request query",
					issues: result.error.issues,
				});
			}
			req.query = result.data as typeof req.query;
		}

		return next();
	};
};
