import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatData, ErrorResponse } from '@shared/index';
import { ChatMessage } from '@shared/types/chat-message';
import { WsMessage } from '@shared/types/ws-message';
import { fetchChatMessages, fetchChatData } from './actions';
import { FETCH_STATUS } from '../../types/fetch-status';

export type ChatState = {
  chatMessages: WsMessage<ChatMessage>[] | null;
  fetchChatMessagesStatus: FETCH_STATUS;
  fetchChatMessagesError: ErrorResponse | null;
  chatsData: ChatData[] | null;
  fetchChatsStatus: FETCH_STATUS;
  fetchChatError: ErrorResponse | null;
};

const initialState: ChatState = {
  chatMessages: null,
  fetchChatMessagesStatus: FETCH_STATUS.IDLE,
  fetchChatMessagesError: null,
  chatsData: null,
  fetchChatsStatus: FETCH_STATUS.IDLE,
  fetchChatError: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatMessages: (state) => {
      state.chatMessages = null;
      state.fetchChatMessagesStatus = FETCH_STATUS.IDLE;
      state.fetchChatMessagesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.fetchChatMessagesStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchChatMessages.fulfilled,
        (state, action: PayloadAction<WsMessage<ChatMessage>[]>) => {
          state.fetchChatMessagesStatus = FETCH_STATUS.SUCCESS;
          state.chatMessages = action.payload;
        },
      )
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.fetchChatMessagesStatus = FETCH_STATUS.ERROR;
        state.fetchChatMessagesError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      })
      .addCase(fetchChatData.pending, (state) => {
        state.fetchChatsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchChatData.fulfilled, (state, action: PayloadAction<ChatData[]>) => {
        state.fetchChatsStatus = FETCH_STATUS.SUCCESS;
        state.chatsData = action.payload;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.fetchChatsStatus = FETCH_STATUS.ERROR;
        state.fetchChatError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      });
  },
});

export const { clearChatMessages } = chatSlice.actions;
