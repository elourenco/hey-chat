import type { IMessage } from './message';

export interface IChatThread {
  id: string;
  participantId: string;
  lastMessage: IMessage;
  lastMessageAt: Date | string;
}
