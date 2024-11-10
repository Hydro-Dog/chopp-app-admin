import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatData, ErrorResponse } from '@shared/index';
import { ChatMessage } from '@shared/types/chat-message';
import { WsMessage } from '@shared/types/ws-message';
import { api } from '@store/middleware';
import axios from 'axios';

export const fetchChatMessages = createAsyncThunk<
  WsMessage<ChatMessage>[],
  string,
  { rejectValue: ErrorResponse }
>('/fetchChatMessages', async (chatId, thunkAPI) => {
  try {
    const response = await api.get<WsMessage<ChatMessage>[]>(`/chats/${chatId}/messages`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
    }
  }
});

export const fetchChatData = createAsyncThunk<ChatData[], void, { rejectValue: ErrorResponse }>(
  '/fetchChatsPreviews',
  async (_, thunkAPI) => {
    try {
      const response = await api.get<ChatData[]>('/chats');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
      }
    }
  },
);
