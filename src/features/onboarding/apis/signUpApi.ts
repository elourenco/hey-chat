import { axiosClient } from '@app/network/http/axiosClient';

interface ISignUpPayload {
  username: string;
  fullname: string;
  password: string;
}

export const signUpApi = async (payload: ISignUpPayload) => {
  return axiosClient.post<void>('/users', payload);
};
