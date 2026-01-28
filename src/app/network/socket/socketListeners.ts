import { receiveMessage } from '@features/chat/core/receiveMessage';
import { loadUserList } from '@features/users/core/loadUserList';
import { updateStatusIsOnline } from '@features/users/core/updateStatusIsOnline';
import type { IMessage } from '@entities/message';
import type { IUser } from '@entities/user';
import type { Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './socketEvents';

type SocketListenersOptions = {
  onConnect?: () => void;
};

export const registerSocketListeners = (client: Socket, options: SocketListenersOptions) => {
  client.on('connect', () => {
    options.onConnect?.();
  });

  client.on(SOCKET_EVENTS.PRESENCE_LIST, (payload: IUser[]) => {
    loadUserList({ payload });
  });

  client.on(SOCKET_EVENTS.USER_ONLINE, (userId: string) => {
    updateStatusIsOnline({ userId, isOnline: true });
  });

  client.on(SOCKET_EVENTS.USER_OFFLINE, (userId: string) => {
    updateStatusIsOnline({ userId, isOnline: false });
  });

  client.on(SOCKET_EVENTS.MESSAGE_RECEIVE, (payload: IMessage) => {
    receiveMessage(payload);
  });
};
