import type { InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import RNConfig from 'react-native-config';
import { abortIfOffline } from './abortIfOffline';
import { attachIdTokenToConfig } from './attachIdTokenToConfig';

export async function enhanceRequestConfig(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  config = await abortIfOffline(config);
  config.headers.set('x-app-version', RNConfig.versionApp);
  config.headers.set('x-app-platform', Platform.OS);
  config = await attachIdTokenToConfig(config);

  return config;
}
