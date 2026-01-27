const onlineUsers = new Map<string, string>();
const socketToUser = new Map<string, string>();

export const PresenceService = {
	setOnline: (userId: string, socketId: string) => {
		onlineUsers.set(userId, socketId);
		socketToUser.set(socketId, userId);
	},
	setOffline: (userId: string) => {
		const socketId = onlineUsers.get(userId);
		if (socketId) {
			socketToUser.delete(socketId);
		}
		onlineUsers.delete(userId);
	},
	setOfflineBySocket: (socketId: string) => {
		const userId = socketToUser.get(socketId);
		if (!userId) {
			return undefined;
		}
		socketToUser.delete(socketId);
		onlineUsers.delete(userId);
		return userId;
	},
	isOnline: (userId: string) => {
		return onlineUsers.has(userId);
	},
	listOnlineIds: () => {
		return Array.from(onlineUsers.keys());
	},
};
