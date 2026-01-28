import { useEffect } from 'react';
import { initializeLocalNotifications } from './localNotifications';

export const useLocalNotifications = () => {
  useEffect(() => {
    void initializeLocalNotifications();
  }, []);
};
