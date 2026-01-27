import { prisma } from "../../config/prisma";
import type { CreateUserPayload } from "./users.types";

export const UsersService = {
	create: async (payload: CreateUserPayload) => {
		return prisma.user.create({ data: payload });
	},
	findById: async (id: string) => {
		return prisma.user.findUnique({ where: { id } });
	},
};
