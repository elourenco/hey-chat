import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma";
import type { CreateUserPayload } from "./users.types";

const userSelect = {
	id: true,
	fullname: true,
	username: true,
	createdAt: true,
	updatedAt: true,
};

const authSelect = {
	id: true,
	fullname: true,
	username: true,
	password: true,
};

export const UsersService = {
	create: async (payload: CreateUserPayload) => {
		const passwordHash = await bcrypt.hash(payload.password, 10);
		return prisma.user.create({
			data: { ...payload, password: passwordHash },
			select: userSelect,
		});
	},
	findById: async (id: string) => {
		return prisma.user.findUnique({ where: { id }, select: userSelect });
	},
	findByUsername: async (username: string) => {
		return prisma.user.findUnique({ where: { username }, select: userSelect });
	},
	findAuthByUsername: async (username: string) => {
		return prisma.user.findUnique({ where: { username }, select: authSelect });
	},
};
