import { Server, Socket } from 'socket.io';
import { MessagesService } from '../modules/messages';
import { PresenceService } from '../modules/presence';
import { SOCKET_EVENTS } from './socket.events';

const onConnection = (io: Server, socket: Socket) => {
  socket.on(SOCKET_EVENTS.USER_ONLINE, (userId: string) => {
    PresenceService.setOnline(userId, socket.id);
    io.emit(SOCKET_EVENTS.USER_ONLINE, userId);
  });

  socket.on(SOCKET_EVENTS.MESSAGE_SEND, async (payload) => {
    const saved = await MessagesService.send(payload);
    io.emit(SOCKET_EVENTS.MESSAGE_RECEIVE, saved);
  });

  socket.on('disconnect', () => {
    const userId = PresenceService.setOfflineBySocket(socket.id);
    if (userId) {
      io.emit(SOCKET_EVENTS.USER_OFFLINE, userId);
    }
  });
};

export const registerSocketHandlers = (io: Server): void => {
  io.on('connection', (socket) => onConnection(io, socket));
};
