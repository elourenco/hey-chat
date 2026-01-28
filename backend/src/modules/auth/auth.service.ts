import jwt, { type SignOptions } from "jsonwebtoken";
import type { User } from "@prisma/client";
import type { RegisterPayload } from "./auth.types";
import { UsersService } from "../users/users.service";

type TokenUser = Pick<User, "id" | "username" | "fullname">;

const getJwtSecret = (): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}
	return secret;
};

export const AuthService = {
	register: async (payload: RegisterPayload) => {
		const existingUser = await UsersService.findByUsername(payload.username);
		if (existingUser) {
			throw new Error("Username already registered");
		}
		return UsersService.create(payload);
	},
	issueToken: (user: TokenUser) => {
		const secret = getJwtSecret();
		const expiresIn =
			(process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"];
		const token = jwt.sign(
			{
				sub: user.id,
				username: user.username,
			},
			secret,
			{ expiresIn },
		);
		return { token };
	},
};
