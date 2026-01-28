import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ChatUiState = {
  activeChatId?: string;
};

const initialState: ChatUiState = {
  activeChatId: undefined,
};

const chatUiSlice = createSlice({
  name: 'chatUi',
  initialState,
  reducers: {
    setActiveChatId: (state, action: PayloadAction<string | undefined>) => {
      state.activeChatId = action.payload;
    },
    clearActiveChatId: (state) => {
      state.activeChatId = undefined;
    },
  },
});

export const { setActiveChatId, clearActiveChatId } = chatUiSlice.actions;
export const chatUiReducer = chatUiSlice.reducer;
