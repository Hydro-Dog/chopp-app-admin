import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessagePayload, ChatsData, ErrorResponse } from '@shared/index';
import { WsMessage } from '@shared/types/ws-message';
import { api } from '@store/middleware';
import axios from 'axios';

export const fetchChatMessages = createAsyncThunk<
  WsMessage<ChatMessagePayload>[],
  void,
  { rejectValue: ErrorResponse }
>('/fetchChatMessages', async (_, thunkAPI) => {
  try {
    const response = await api.get<WsMessage<ChatMessagePayload>[]>('/chat/messages');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
    }
  }
});

export const fetchChatPreviews = createAsyncThunk<
  ChatsData[],
  void,
  { rejectValue: ErrorResponse }
>('/fetchChatsPreviews', async (_, thunkAPI) => {
  try {
    const response = await api.get<ChatsData[]>('/chat/previews');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
    }
  }
});
