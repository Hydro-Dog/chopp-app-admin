import { useFilterWsMessages } from '@shared/hooks';
import { ChatMessage } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type Args = {
  setMessages: any;
};

export const useNewIncomingMessageChatHandler = ({ setMessages }: Args) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(WS_MESSAGE_TYPE.MESSAGE);

  useEffect(() => {
    if (currentChatId === newMessage?.payload?.chatId) {
      setMessages((prev) => [...prev, newMessage?.payload]);
    }
  }, [currentChatId, newMessage]);
};
