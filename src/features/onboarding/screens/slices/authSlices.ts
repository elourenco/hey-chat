import type { IAuth } from '@entities/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuth = {
  token: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      Object.assign(state, action.payload);
    },
    removeAuth: (state) => {
      return { ...state, ...initialState };
    },
  },
});
export const { setAuth, removeAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
