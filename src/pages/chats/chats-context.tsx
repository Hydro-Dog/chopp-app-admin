import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { ChatData, ChatMessage } from '@shared/types';

export type ChatsContextType = {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chats: ChatData[];
  setChats: Dispatch<SetStateAction<ChatData[]>>;
};

const chatsContextInitialValue: ChatsContextType = {
  messages: [],
  setMessages: () => [],
  chats: [],
  setChats: () => [],
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatData[]>([]);

  return (
    <ChatsContext.Provider value={{ messages, setMessages, chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  );
};
