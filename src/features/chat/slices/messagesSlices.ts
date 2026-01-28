import type { IMessage } from '@entities/message';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { isMessageInChat, resolveMessageTimestamp } from '../utils/messages';

const initialState: IMessage[] = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IMessage | IMessage[]>) => {
      const incoming = Array.isArray(action.payload) ? action.payload : [action.payload];
      const mergedById = new Map<string, IMessage>(state.map((message) => [message.id, message]));
      for (const message of incoming) {
        const existing = mergedById.get(message.id);
        mergedById.set(message.id, existing ? { ...existing, ...message } : message);
      }
      return Array.from(mergedById.values()).sort(
        (a, b) => resolveMessageTimestamp(b) - resolveMessageTimestamp(a),
      );
    },
    removeMessageById: (state, action: PayloadAction<string>) => {
      return state.filter((message) => message.id !== action.payload);
    },
    resetMessages: () => {
      return initialState;
    },
  },
});

export const { setMessages, removeMessageById, resetMessages } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;

export const selectMessagesByChatId = (
  messages: IMessage[],
  currentUserId?: string,
  chatId?: string,
) => {
  if (!currentUserId || !chatId) {
    return [];
  }

  return messages
    .filter((message) => isMessageInChat(message, currentUserId, chatId))
    .sort((a, b) => resolveMessageTimestamp(a) - resolveMessageTimestamp(b));
};
