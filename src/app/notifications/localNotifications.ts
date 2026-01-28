import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Loggers } from '@utils/loggers';
import { Platform } from 'react-native';

export type LocalNotificationPayload = {
  title?: string;
  body: string;
};

const DEFAULT_TITLE = 'Nova mensagem';
const CHANNEL_ID = 'messages';
const CHANNEL_NAME = 'Mensagens';

let channelPromise: Promise<string> | null = null;

const ensureAndroidChannel = async () => {
  if (Platform.OS !== 'android') {
    return undefined;
  }

  if (!channelPromise) {
    channelPromise = notifee.createChannel({
      id: CHANNEL_ID,
      name: CHANNEL_NAME,
      importance: AndroidImportance.HIGH,
    });
  }

  return channelPromise;
};

const ensurePermissions = async () => {
  const settings = await notifee.requestPermission();
  return settings.authorizationStatus;
};

export const initializeLocalNotifications = async () => {
  try {
    await ensurePermissions();
    await ensureAndroidChannel();
  } catch (error) {
    Loggers.error(error);
  }
};

export const showLocalNotification = async ({
  title = DEFAULT_TITLE,
  body,
}: LocalNotificationPayload) => {
  try {
    const status = await ensurePermissions();
    if (Platform.OS === 'ios' && status < AuthorizationStatus.AUTHORIZED) {
      return;
    }

    const channelId = await ensureAndroidChannel();

    await notifee.displayNotification({
      title,
      body,
      android: channelId
        ? {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
          }
        : undefined,
      ios: {
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
    });
  } catch (error) {
    Loggers.error(error);
  }
};
