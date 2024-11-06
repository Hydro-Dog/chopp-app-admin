import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatMessagePayload, ChatsData, ErrorResponse } from '@shared/index';
import { WsMessage } from '@shared/types/ws-message';
import { fetchChatMessages, fetchChatPreviews } from './actions';
import { FETCH_STATUS } from '../../types/fetch-status';

export type ChatState = {
  chatMessages: WsMessage<ChatMessagePayload>[] | null;
  fetchChatMessagesStatus: FETCH_STATUS;
  fetchChatMessagesError: ErrorResponse | null;
  chatPreviews: ChatsData[] | null;
  fetchChatPreviewsStatus: FETCH_STATUS;
  fetchChatPreviewsError: ErrorResponse | null;
};

const initialState: ChatState = {
  chatMessages: null,
  fetchChatMessagesStatus: FETCH_STATUS.IDLE,
  fetchChatMessagesError: null,
  chatPreviews: null,
  fetchChatPreviewsStatus: FETCH_STATUS.IDLE,
  fetchChatPreviewsError: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.fetchChatMessagesStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchChatMessages.fulfilled,
        (state, action: PayloadAction<WsMessage<ChatMessagePayload>[]>) => {
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
      .addCase(fetchChatPreviews.pending, (state) => {
        state.fetchChatPreviewsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchChatPreviews.fulfilled, (state, action: PayloadAction<ChatsData[]>) => {
        state.fetchChatPreviewsStatus = FETCH_STATUS.SUCCESS;
        state.chatPreviews = action.payload;
      })
      .addCase(fetchChatPreviews.rejected, (state, action) => {
        state.fetchChatPreviewsStatus = FETCH_STATUS.ERROR;
        state.fetchChatPreviewsError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      });
  },
});
