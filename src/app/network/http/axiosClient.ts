import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { Platform } from 'react-native';
import RNConfig from 'react-native-config';
import { enhanceRequestConfig } from './enhanceRequestConfig';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const resolveBaseUrl = (baseUrl?: string) => {
  if (!baseUrl || !__DEV__ || Platform.OS !== 'android') {
    return baseUrl;
  }

  return baseUrl.replace(/\/\/(localhost|127\.0\.0\.1)(?=[:/]|$)/, '//10.0.2.2');
};

const options: AxiosRequestConfig = {
  baseURL: resolveBaseUrl(RNConfig.BASE_URL),
  timeout: __DEV__ ? 3000000 : 90000,
  headers: { ...defaultHeaders },
};

const instance: AxiosInstance = axios.create(options);

instance.interceptors.request.use(
  async (config) => {
    const enhanced = await enhanceRequestConfig(config);
    return enhanced;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { instance as axiosClient };
