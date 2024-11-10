import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { useFilterWsMessages } from '@shared/hooks';
import { ChatMessage } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState } from '@store/index';

export const useNewIncomingMessagePreviewHandler = () => {
  const { setChats } = useChatsContext();
  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(WS_MESSAGE_TYPE.MESSAGE);

  useEffect(() => {
    setChats((prev: ChatsData[]) => {
      const c = prev?.map((item) => {
        const lastMessage =
          currentChatId === item.chatId
            ? {
                ...newMessage.payload,
                wasReadBy: [...(newMessage.payload?.wasReadBy || []), currentUser?.id],
              }
            : newMessage.payload;

        return item.chatId === newMessage?.payload?.chatId ? { ...item, lastMessage } : item;
      });

      return c;
    });
  }, [newMessage]);

  //   useEffect(() => {
  //     setChats((prev: ChatData[]) => {
  //       const b = prev?.map((item) => {
  //         console.log('mmm: ', item.chatId, newMessage?.payload?.chatId, currentChatId);
  //         console.log('newMessage?.payload: ', newMessage?.payload);
  //         if (
  //           item.chatId === newMessage?.payload?.chatId &&
  //           item.chatId !== currentChatId &&
  //           item.lastMessage.messageId
  //         ) {
  //           return { ...item, lastMessage: newMessage?.payload };
  //         }
  //         return item;
  //       });
  //       console.log('b: ', b);
  //       return b;
  //     });
  //   }, [currentChatId, newMessage]);
};
