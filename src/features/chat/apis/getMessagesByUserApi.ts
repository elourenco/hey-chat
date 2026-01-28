import { axiosClient } from '@app/network/http/axiosClient';
import type { IMessage } from '@entities/message';

export const getMessagesByUserApi = async (userId: string) => {
  return axiosClient.get<IMessage[]>(`/messages/user/${userId}`);
};
