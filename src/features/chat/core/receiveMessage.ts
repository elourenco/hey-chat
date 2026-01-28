import { showLocalNotification } from '@app/notifications/localNotifications';
import { store } from '@app/redux/store';
import type { IMessage } from '@entities/message';
import { setMessages } from '../slices/messagesSlices';

export const receiveMessage = (payload: IMessage) => {
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
};
