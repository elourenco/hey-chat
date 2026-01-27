import { Server } from "socket.io";
import type http from "node:http";
import { registerSocketHandlers } from "./socket.handlers";

export const initSockets = (server: http.Server): Server => {
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	});

	registerSocketHandlers(io);
	return io;
};
