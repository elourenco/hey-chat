import { prisma } from "../../config/prisma";
import type { SendMessagePayload } from "./messages.types";

export const MessagesService = {
	send: async (payload: SendMessagePayload) => {
		return prisma.message.create({ data: payload });
	},
	listByUser: async (userId: string) => {
		return prisma.message.findMany({
			where: {
				OR: [{ from: userId }, { to: userId }],
			},
			orderBy: { createdAt: "desc" },
		});
	},
};
