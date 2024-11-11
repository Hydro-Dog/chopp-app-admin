import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { useFilterWsMessages } from '@shared/hooks';
import { ChatMessage } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const useNewIncomingMessageChatHandler = () => {
  const [searchParams] = useSearchParams();
  const { setMessages } = useChatsContext();
  const currentChatId = searchParams.get('id');
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(WS_MESSAGE_TYPE.MESSAGE);

  useEffect(() => {
    if (currentChatId === newMessage?.payload?.chatId) {
      setMessages((prev) => [...prev, newMessage?.payload]);
    }

  }, [currentChatId, newMessage]);
};
