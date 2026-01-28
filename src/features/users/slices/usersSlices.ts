import type { IUser } from '@entities/user';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser | IUser[]>) => {
      const incoming = Array.isArray(action.payload) ? action.payload : [action.payload];

      const mergedById = new Map<string, IUser>(state.map((user) => [user.id, user]));

      for (const user of incoming) {
        const existing = mergedById.get(user.id);
        mergedById.set(user.id, existing ? { ...existing, ...user } : user);
      }

      return Array.from(mergedById.values());
    },
    setIsOnline: (state, action: PayloadAction<{ id: string; online: boolean }>) => {
      const user = state.find((item) => item.id === action.payload.id);
      if (user) {
        user.online = action.payload.online;
      }
    },
    removeUsers: () => {
      return initialState;
    },
  },
});
export const { setUsers, setIsOnline, removeUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
