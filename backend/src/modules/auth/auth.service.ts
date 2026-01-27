import type { LoginPayload, RegisterPayload } from "./auth.types";

export const AuthService = {
	register: async (payload: RegisterPayload) => {
		return { id: "todo", ...payload };
	},
	login: async (_payload: LoginPayload) => {
		return { token: "todo" };
	},
};
