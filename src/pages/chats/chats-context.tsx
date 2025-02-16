import {
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { Chat, ChatMessage, ChatStats, FETCH_STATUS } from '@shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, updateChats, updateMessages } from '@store/index';
import { noop } from 'antd/es/_util/warning';

export type ChatsContextType = {
  messages: ChatMessage[];
  setMessages: (chatMessages: ChatMessage[]) => void;
  pushNewMessageToChat: (chatMessage: ChatMessage) => void;
  chats: Chat[];
  openedChat: string | null;
  fetchChatsStatus: FETCH_STATUS;
  fetchChatMessagesStatus: FETCH_STATUS;
  setChats: (chats: Chat[]) => void;
  chatsStats: ChatStats;
  // setChatsStats: Dispatch<SetStateAction<ChatStats>>;
};

const chatsContextInitialValue: ChatsContextType = {
  messages: [],
  setMessages: () => [],
  pushNewMessageToChat: () => noop,
  chats: [],
  openedChat: null,
  fetchChatsStatus: FETCH_STATUS.IDLE,
  fetchChatMessagesStatus: FETCH_STATUS.IDLE,
  setChats: () => [],
  chatsStats: {} as ChatStats,
  // setChatsStats: () => ({}) as ChatStats,
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const dispatch = useDispatch<AppDispatch>();

  const chatsStats = { total: 1, read: 1, unread: 1 };

  const {
    chats = [],
    chatMessages,
    fetchChatsStatus,
    fetchChatMessagesStatus,
    openedChat,
  } = useSelector((state: RootState) => state.chatsRepository);

  const setChats = (chats: Chat[]) => {
    dispatch(updateChats(chats));
  };

  const setMessages = (chatMessages: ChatMessage[]) => {
    dispatch(updateMessages(chatMessages));
  };

  const pushNewMessageToChat = (newChatMessage: ChatMessage) => {
    const changesChatMessages = [...chatMessages, newChatMessage];

    dispatch(updateMessages(changesChatMessages));

    const updatedChats = chats.map(chat =>
        `${chat.id}` === newChatMessage.chatId ? { ...chat, lastMessage: newChatMessage } : chat
    );

    setChats(updatedChats);
  }

  return (
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        messages: chatMessages,
        pushNewMessageToChat,
        setMessages,
        chatsStats,
        fetchChatsStatus,
        fetchChatMessagesStatus,
        openedChat,
        // setChatsStats
        }}>
      {children}
    </ChatsContext.Provider>
  );
};
