import { createAsyncThunk } from '@reduxjs/toolkit';
import { Chat, ChatStats, ErrorResponse } from '@shared/index';
import { ChatMessage } from '@shared/types/chat-message';
import { WsMessage } from '@shared/types/ws-message';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

// export const fetchChatMessages = createAsyncThunk<
//   WsMessage<ChatMessage>[],
//   string,
//   { rejectValue: ErrorResponse }
// >('/fetchChatMessages', async (chatId, thunkAPI) => {
//   try {
//     const response = await axiosPrivate.get<WsMessage<ChatMessage>[]>(`/chats/${chatId}/messages`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//     }
//   }
// });

// export const fetchChats = createAsyncThunk<Chat[], void, { rejectValue: ErrorResponse }>(
//   '/fetchChatsPreviews',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.get<Chat[]>('/chats');
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//       }
//     }
//   },
// );

// type CreateChatDto = {
//   userId: string;
//   ownerId: string;
// }

// export const createChatAction = createAsyncThunk<Chat, CreateChatDto, { rejectValue: ErrorResponse }>(
//   '/createChat',
//   async (chatData, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.post(`chats`, chatData);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//       }
//     }
//   },
// );

// export const fetchChatStats = createAsyncThunk<ChatStats, string, { rejectValue: ErrorResponse }>(
//   '/fetchChatStats',
//   async (chatId, thunkAPI) => {
//     try {
//       const response = await axiosPrivate.get<ChatStats>(`/chats/${chatId}/stats`);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({
//           errorMessage: 'An unknown error occurred',
//         });
//       }
//     }
//   },
// );
