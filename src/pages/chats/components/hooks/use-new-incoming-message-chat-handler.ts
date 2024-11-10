import { useChatsContext } from '@pages/chats/chats-context';
import { useFilterWsMessages } from '@shared/hooks';
import { ChatMessage } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState } from '@store/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

type Args = {
  setMessages: any;
};

export const useNewIncomingMessageChatHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setMessages } = useChatsContext();
  const currentChatId = searchParams.get('id');
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(WS_MESSAGE_TYPE.MESSAGE);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentChatId === newMessage?.payload?.chatId) {
      const message: ChatMessage =
        currentChatId === newMessage?.payload.chatId
          ? {
              ...newMessage?.payload,
              wasReadBy: [...newMessage?.payload.wasReadBy, currentUser?.id],
            }
          : newMessage.payload;

          console.log('--------message: ', message)
      setMessages((prev) => [...prev, message]);
    }
  }, [currentChatId, newMessage]);
};
