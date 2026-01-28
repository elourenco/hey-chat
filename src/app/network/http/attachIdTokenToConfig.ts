import type { InternalAxiosRequestConfig } from 'axios';

export async function attachIdTokenToConfig(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  const user = getAuth().currentUser;

  if (!user) return config;

  try {
    const idToken = '';
    config.headers.set('Authorization', `Bearer ${idToken}`);
  } catch (_err) {
    if (__DEV__) {
      console.log('Failed to attach ID token to request headers');
    }
  }

  return config;
}
