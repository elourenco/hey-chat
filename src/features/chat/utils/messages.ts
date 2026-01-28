import type { IMessage } from '@entities/message';

const resolveDate = (value?: Date | string) => {
  if (!value) {
    return undefined;
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return date;
};

export const resolveMessageTimestamp = (message: IMessage) => {
  const resolved = resolveDate(message.updatedAt ?? message.createdAt);
  return resolved ? resolved.getTime() : 0;
};

export const isMessageInChat = (message: IMessage, currentUserId: string, chatId: string) => {
  return (
    (message.from === currentUserId && message.to === chatId) ||
    (message.from === chatId && message.to === currentUserId)
  );
};

export const formatChatTimestamp = (value?: Date | string) => {
  const date = resolveDate(value);
  if (!date) {
    return '';
  }

  const now = new Date();
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

export const formatMessageTimestamp = (value?: Date | string) => {
  const date = resolveDate(value);
  if (!date) {
    return '';
  }

  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};
