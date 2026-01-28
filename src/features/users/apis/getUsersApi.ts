import { axiosClient } from '@app/network/http/axiosClient';

interface UserResponse {
  id: string;
  fullname: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  online: boolean;
}

export const getUsersApi = async () => {
  return axiosClient.get<UserResponse[]>('/users');
};
