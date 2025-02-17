import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Chat, ChatStats, ErrorResponse } from '@shared/index';
import { ChatMessage } from '@shared/types/chat-message';
import { WsMessage } from '@shared/types/ws-message';
import { fetchChatMessages, fetchChats, fetchChatStats, createChatAction } from './actions';
import { FETCH_STATUS } from '@shared/index';

export type ChatsState = {
  // state of messages
  chatMessages: ChatMessage[];
  fetchChatMessagesStatus: FETCH_STATUS;
  fetchChatMessagesError: ErrorResponse | null;

  // state of chat
  chats: Chat[];
  fetchChatsStatus: FETCH_STATUS;
  fetchChatsError: ErrorResponse | null;

  // state of chatStats
  chatsStats: ChatStats | null;
  fetchChatsStatsStatus: FETCH_STATUS;
  fetchChatStatsError: ErrorResponse | null;

  // state of chat creation
  createdChat: Chat | null;
  createChatStatus: FETCH_STATUS;
  createChatError: ErrorResponse | null;

  // chat page state
  openedChat: Chat['id'] | null;
};

const initialState: ChatsState = {
  chatMessages: [],
  fetchChatMessagesStatus: FETCH_STATUS.IDLE,
  fetchChatMessagesError: null,
  chats: [],
  fetchChatsStatus: FETCH_STATUS.IDLE,
  fetchChatsError: null,
  chatsStats: null,
  fetchChatsStatsStatus: FETCH_STATUS.IDLE,
  fetchChatStatsError: null,
  createdChat: null,
  createChatStatus: FETCH_STATUS.IDLE,
  createChatError: null,
  openedChat: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatMessages: (state) => {
      state.chatMessages = [];
      state.fetchChatMessagesStatus = FETCH_STATUS.IDLE;
      state.fetchChatMessagesError = null;
    },
    clearChatCreatingHistory: (state) => {
      state.createdChat = null;
      state.createChatStatus = FETCH_STATUS.IDLE;
      state.createChatError = null;
    },
    updateChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    updateMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.chatMessages = action.payload;
    },
    pushWsMessage: (state, action: PayloadAction<{ message: ChatMessage }>) => {
      try {
        const { message } = action.payload
        state.chatMessages.push(message);

        const updatedChats = state.chats.map(chat =>
          `${chat.id}` === `${message.chatId}` ? { ...chat, lastMessage: message } : chat
        );

        state.chats = updatedChats;
      } catch (error) {
        console.error(error);
      }
    },
    setOpenedChat: (state, action: PayloadAction<string | null>) => {
      // string, когда новый чат открыт, null когда чат удален
      state.openedChat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //messages actions
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
      // chats actions
      .addCase(fetchChats.pending, (state) => {
        state.fetchChatsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.fetchChatsStatus = FETCH_STATUS.SUCCESS;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.fetchChatsStatus = FETCH_STATUS.ERROR;
        state.fetchChatsError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      })
      .addCase(fetchChatStats.pending, (state) => {
        state.fetchChatsStatsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchChatStats.fulfilled, (state, action: PayloadAction<ChatStats>) => {
        state.fetchChatsStatsStatus = FETCH_STATUS.SUCCESS;
        state.chatsStats = action.payload;
      })
      .addCase(fetchChatStats.rejected, (state, action) => {
        state.fetchChatsStatsStatus = FETCH_STATUS.ERROR;
        state.fetchChatStatsError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      })
      .addCase(createChatAction.pending, (state) => {
        state.createChatStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createChatAction.fulfilled, (state, action: PayloadAction<Chat>) => {
        state.createChatStatus = FETCH_STATUS.SUCCESS;
        state.createdChat = action.payload;
      })
      .addCase(createChatAction.rejected, (state, action) => {
        state.createChatStatus = FETCH_STATUS.ERROR;
        state.createChatError = action.payload ?? {
          errorMessage: 'Failed to fetch chat information',
        };
      });
  },
});

export const {
  clearChatMessages,
  clearChatCreatingHistory,
  setOpenedChat,
  updateChats,
  updateMessages,
  pushWsMessage,
} = chatSlice.actions;
