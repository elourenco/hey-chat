import { chatUiReducer } from '@features/chat/slices/chatUiSlice';
import { messagesReducer } from '@features/chat/slices/messagesSlices';
import { authReducer } from '@features/onboarding/slices/authSlices';
import { usersReducer } from '@features/users/slices/usersSlices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { reduxStorage } from './reduxStorage';

const persistConfig = {
  storage: reduxStorage,
  key: 'root',
};

// Add more reducers here
const rootReducer = combineReducers({
  authReducer,
  usersReducer,
  messagesReducer,
  chatUiReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const persistor = persistStore(store);
