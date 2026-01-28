import { Platform } from 'react-native';
import RNConfig from 'react-native-config';

export const resolveSocketBaseUrl = (baseUrl?: string) => {
  if (!baseUrl || !__DEV__ || Platform.OS !== 'android') {
    return baseUrl;
  }

  return baseUrl.replace(/\/\/(localhost|127\.0\.0\.1)(?=[:/]|$)/, '//10.0.2.2');
};

export const getSocketBaseUrl = () => resolveSocketBaseUrl(RNConfig.baseUrl);
