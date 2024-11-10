import { SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ChatData } from '@shared/types';
import { RootState } from '@store/index';
import { useChatsContext } from '@pages/chats/chats-context';

export const useMarkChatAsRead = () => {
  const { chats, setChats } = useChatsContext();
  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setChats?.((prev) => {
      const a = prev?.map((item) => {
        if (!currentUser?.id) {
          return item;
        }
        const wasReadBy = item.lastMessage.wasReadBy;
        const wasReadByCurrentUser = item.lastMessage.wasReadBy?.includes(currentUser?.id)
          ? wasReadBy
          : [...wasReadBy, currentUser?.id];

        return currentChatId === item.chatId
          ? { ...item, lastMessage: { ...item.lastMessage, wasReadBy: wasReadByCurrentUser } }
          : item;
      });

      return a;
    });
  }, [currentChatId, currentUser?.id, setChats, chats?.length]);
};
