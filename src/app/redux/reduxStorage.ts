import { createMMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

const mmkvReduxStorage = createMMKV({ id: 'reduxStorage' });

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    mmkvReduxStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = mmkvReduxStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    mmkvReduxStorage.remove(key);
    return Promise.resolve();
  },
};
