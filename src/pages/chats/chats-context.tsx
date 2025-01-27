import {
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { Chat, ChatMessage, ChatStats } from '@shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchChats as fetchChatsAction, RootState, updateChats, updateMessages } from '@store/index';
import { noop } from 'antd/es/_util/warning';

export type ChatsContextType = {
  messages: ChatMessage[];
  setMessages: (chatMessages: ChatMessage[]) => void;
  pushNewMessageToChat: (chatMessage: ChatMessage) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  fetchChats: () => void;
  chatsStats: ChatStats;
  // setChatsStats: Dispatch<SetStateAction<ChatStats>>;
};

const chatsContextInitialValue: ChatsContextType = {
  messages: [],
  setMessages: () => [],
  pushNewMessageToChat: () => noop,
  chats: [],
  setChats: () => [],
  fetchChats: () => noop,
  chatsStats: {} as ChatStats,
  // setChatsStats: () => ({}) as ChatStats,
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const dispatch = useDispatch<AppDispatch>();

  const chatsStats = { total: 1, read: 1, unread: 1 };

  const { chats = [], chatMessages } = useSelector((state: RootState) => state.chatsRepository);

  const setChats = (chats: Chat[]) => {
    dispatch(updateChats(chats));
  };

  const setMessages = (chatMessages: ChatMessage[]) => {
    dispatch(updateMessages(chatMessages));
  };

  const fetchChats = () => {
    dispatch(fetchChatsAction());
  };

  const pushNewMessageToChat = (newChatMessage: ChatMessage) => {
    const changesChatMessages = [...chatMessages, newChatMessage];
    dispatch(updateMessages(changesChatMessages));
  }

  return (
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        fetchChats,
        messages: chatMessages,
        pushNewMessageToChat,
        setMessages,
        chatsStats,
        // setChatsStats
        }}>
      {children}
    </ChatsContext.Provider>
  );
};
