import { axiosClient } from '@app/network/http/axiosClient';
import type { IMessage } from '@entities/message';

export interface SendMessageApiPayload {
  from: string;
  to: string;
  body: string;
}

export const sendMessageApi = async (payload: SendMessageApiPayload) => {
  return axiosClient.post<IMessage>('/messages', payload);
};
