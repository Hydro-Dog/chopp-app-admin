import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { ChatData, ChatMessage, ChatStats } from '@shared/types';

export type ChatsContextType = {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chats: ChatData[];
  setChats: Dispatch<SetStateAction<ChatData[]>>;
  chatsStats: ChatStats;
  setChatsStats: Dispatch<SetStateAction<ChatStats>>;
};

const chatsContextInitialValue: ChatsContextType = {
  messages: [],
  setMessages: () => [],
  chats: [],
  setChats: () => [],
  chatsStats: {} as ChatStats,
  setChatsStats: () => ({}) as ChatStats,
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatData[]>(
    // dummy data for testing
    // [
    //   {
    //     id: '1',
    //     userId: '1',
    //     fullName: 'Full Name',
    //     lastMessage: {
    //       messageId: '1',
    //       senderId: '1',
    //       text: 'string',
    //       timeStamp: 2132131232,
    //       wasReadBy: [],
    //       chatId: '1',
    //     },
    //   },
    // ]
    []
  );
  const [chatsStats, setChatsStats] = useState<ChatStats>({} as ChatStats);

  return (
    <ChatsContext.Provider
      value={{ messages, setMessages, chats, setChats, chatsStats, setChatsStats }}>
      {children}
    </ChatsContext.Provider>
  );
};
