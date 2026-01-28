/**
 * Aborts the request by injecting an AbortController if the device is offline.
 */

import NetInfo from '@react-native-community/netinfo';
import type { InternalAxiosRequestConfig } from 'axios';

export async function abortIfOffline(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    const controller = new AbortController();
    controller.abort();
    config.signal = controller.signal;
  }

  return config;
}
