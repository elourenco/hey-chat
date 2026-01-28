import type { IChatThread } from '@entities/chat';
import type { IMessage } from '@entities/message';
import { resolveMessageTimestamp } from './messages';

export const buildChatThreads = (messages: IMessage[], currentUserId?: string): IChatThread[] => {
  if (!currentUserId) {
    return [];
  }

  const threadMap = new Map<string, IMessage>();

  for (const message of messages) {
    if (message.from !== currentUserId && message.to !== currentUserId) {
      continue;
    }

    const participantId = message.from === currentUserId ? message.to : message.from;
    const existing = threadMap.get(participantId);

    if (!existing || resolveMessageTimestamp(message) > resolveMessageTimestamp(existing)) {
      threadMap.set(participantId, message);
    }
  }

  const threads: IChatThread[] = Array.from(threadMap.entries()).map(
    ([participantId, lastMessage]) => ({
      id: participantId,
      participantId,
      lastMessage,
      lastMessageAt: lastMessage.updatedAt ?? lastMessage.createdAt ?? new Date(0),
    }),
  );

  return threads.sort(
    (a, b) => resolveMessageTimestamp(b.lastMessage) - resolveMessageTimestamp(a.lastMessage),
  );
};
