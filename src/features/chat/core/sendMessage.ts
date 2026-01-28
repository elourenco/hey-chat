import { socketService } from '@app/network/socket/socketService';
import { store } from '@app/redux/store';
import type { IMessage } from '@entities/message';
import type { IResult } from 'src/types/function';
import { type SendMessageApiPayload, sendMessageApi } from '../apis/sendMessageApi';
import { setMessages } from '../slices/messagesSlices';

export const sendMessage = async (payload: SendMessageApiPayload): Promise<IResult<IMessage>> => {
  try {
    if (socketService.isConnected()) {
      socketService.sendMessage(payload);
      return {};
    }

    const response = await sendMessageApi(payload);
    const message = response.data;
    store.dispatch(setMessages(message));
    return {
      data: message,
    };
  } catch (error) {
    return {
      error: {
        code: 'SEND_MESSAGE_ERROR',
        message: `Failed to send message. - ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        originError: error instanceof Error ? error : undefined,
      },
    };
  }
};
