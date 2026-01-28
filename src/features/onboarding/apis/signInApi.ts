import { axiosClient } from '@app/network/http/axiosClient';

interface SignInApiResponse {
  token: string;
}

interface SignInApiPayload {
  username: string;
  password: string;
}

export const signInApi = async (payload: SignInApiPayload) => {
  return axiosClient.post<SignInApiResponse>('/auth/login', payload);
};
