import { store } from '@app/redux/store';
import { Loggers } from '@utils/loggers';
import type { InternalAxiosRequestConfig } from 'axios';

export async function attachIdTokenToConfig(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  const token = store.getState().authReducer.token;

  if (!token) return config;

  try {
    config.headers.set('Authorization', `Bearer ${token}`);
  } catch (_err) {
    Loggers.error('Failed to attach ID token to request');
  }

  return config;
}
