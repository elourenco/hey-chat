import { store } from '@app/redux/store';
import type { IMessage } from '@entities/message';
import type { IResult } from 'src/types/function';
import { getMessagesByUserApi } from '../apis/getMessagesByUserApi';
import { setMessages } from '../slices/messagesSlices';

interface LoadMessagesByUserParams {
  userId: string;
  payload?: IMessage[];
}

const resolveMessages = async (userId: string, payload?: IMessage[]): Promise<IMessage[]> => {
  if (Array.isArray(payload)) {
    return payload;
  }
  const response = await getMessagesByUserApi(userId);
  return response.data;
};

export const loadMessagesByUser = async ({
  userId,
  payload,
}: LoadMessagesByUserParams): Promise<IResult<IMessage[]>> => {
  try {
    const messages = await resolveMessages(userId, payload);
    store.dispatch(setMessages(messages));
    return {
      data: messages,
    };
  } catch (error) {
    return {
      error: {
        code: 'LOAD_MESSAGES_ERROR',
        message: `Failed to load messages. - ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        originError: error instanceof Error ? error : undefined,
      },
    };
  }
};
