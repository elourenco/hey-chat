import { showLocalNotification } from '@app/notifications/localNotifications';
import { store } from '@app/redux/store';
import { setMessages } from '@features/chat/slices/messagesSlices';
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
    store.dispatch(setMessages(payload));

    const { chatUiReducer, authReducer } = store.getState();
    const currentUserId = authReducer?.userId;
    const activeChatId = chatUiReducer?.activeChatId;

    if (!currentUserId || payload.from === currentUserId) {
      return;
    }

    const isChatOpen = activeChatId === payload.from || activeChatId === payload.to;
    if (!isChatOpen) {
      showLocalNotification({
        title: 'Nova mensagem',
        body: payload.body,
      });
    }
  });
};
