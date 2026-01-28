import { Loggers } from '@utils/loggers';
import { io, type Socket } from 'socket.io-client';
import { getSocketBaseUrl } from './socketBaseUrl';
import { SOCKET_EVENTS } from './socketEvents';
import { registerSocketListeners } from './socketListeners';

let socket: Socket | null = null;
let currentUserId: string | null = null;

type SocketMessagePayload = {
  from: string;
  to: string;
  body: string;
};

const emitOnline = () => {
  if (socket?.connected && currentUserId) {
    socket.emit(SOCKET_EVENTS.USER_ONLINE, currentUserId);
  }
};

export const socketService = {
  connect: (userId: string) => {
    if (!userId) return;
    currentUserId = userId;

    const baseUrl = getSocketBaseUrl();
    if (!baseUrl) {
      Loggers.error('Socket base URL is not configured');
      return;
    }

    if (!socket) {
      socket = io(baseUrl, {
        transports: ['websocket'],
        autoConnect: false,
        reconnection: true,
      });
      registerSocketListeners(socket, { onConnect: emitOnline });
    }

    if (!socket.connected) {
      socket.connect();
    } else {
      emitOnline();
    }
  },
  disconnect: () => {
    if (!socket) return;

    try {
      socket.emit(SOCKET_EVENTS.USER_OFFLINE);
    } catch {
      // ignore
    }

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    currentUserId = null;
  },
  isConnected: () => Boolean(socket?.connected),
  sendMessage: (payload: SocketMessagePayload) => {
    if (!socket?.connected) {
      return false;
    }
    socket.emit(SOCKET_EVENTS.MESSAGE_SEND, payload);
    return true;
  },
};
