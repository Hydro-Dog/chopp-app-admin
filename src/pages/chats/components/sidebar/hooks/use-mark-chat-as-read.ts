import { SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ChatData } from '@shared/types';
import { RootState } from '@store/index';

type Args = {
  chats: ChatData[]
  setChats: (value: SetStateAction<ChatData[]>) => void;
};

export const useMarkChatAsRead = ({ setChats, chats }: Args) => {
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

      console.log('a: ', a);

      return a;
    });
  }, [currentChatId, currentUser?.id, setChats, chats?.length]);
};
