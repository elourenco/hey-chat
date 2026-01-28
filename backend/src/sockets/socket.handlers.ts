import { Server, Socket } from 'socket.io';
import { MessagesService } from '../modules/messages';
import { UsersService } from '../modules/users';
import { PresenceService } from '../modules/presence';
import { SOCKET_EVENTS } from './socket.events';

const buildPresenceList = async () => {
  const users = await UsersService.list();
  const onlineIds = new Set(PresenceService.listOnlineIds());
  return users.map((user) => ({
    ...user,
    online: onlineIds.has(user.id),
  }));
};

const emitPresenceList = async (io: Server, socket?: Socket) => {
  const payload = await buildPresenceList();
  if (socket) {
    socket.emit(SOCKET_EVENTS.PRESENCE_LIST, payload);
    return;
  }
  io.emit(SOCKET_EVENTS.PRESENCE_LIST, payload);
};

const onConnection = (io: Server, socket: Socket) => {
  void emitPresenceList(io, socket);

  socket.on(SOCKET_EVENTS.USER_ONLINE, (userId: string) => {
    PresenceService.setOnline(userId, socket.id);
    io.emit(SOCKET_EVENTS.USER_ONLINE, userId);
    void emitPresenceList(io);
  });

  socket.on(SOCKET_EVENTS.USER_OFFLINE, () => {
    const userId = PresenceService.setOfflineBySocket(socket.id);
    if (userId) {
      io.emit(SOCKET_EVENTS.USER_OFFLINE, userId);
      void emitPresenceList(io);
    }
  });

  socket.on(SOCKET_EVENTS.MESSAGE_SEND, async (payload) => {
    const saved = await MessagesService.send(payload);
    io.emit(SOCKET_EVENTS.MESSAGE_RECEIVE, saved);
  });

  socket.on('disconnect', () => {
    const userId = PresenceService.setOfflineBySocket(socket.id);
    if (userId) {
      io.emit(SOCKET_EVENTS.USER_OFFLINE, userId);
      void emitPresenceList(io);
    }
  });
};

export const registerSocketHandlers = (io: Server): void => {
  io.on('connection', (socket) => onConnection(io, socket));
};
