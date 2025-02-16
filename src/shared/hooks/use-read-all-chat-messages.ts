import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useChatsContext } from '@pages/chats/chats-context';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { AppDispatch, RootState } from '@store/index';
import { wsSend } from '@store/slices';

export const useReadAllChatMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');
  const { setMessages, messages } = useChatsContext();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentChatId && currentUser) {

      const updatedMessages = messages.map((message) => {
        return message.wasReadBy.includes(currentUser.id)
          ? message
          : { ...message, wasReadBy: [...message.wasReadBy, currentUser.id] };
      });

      setMessages(updatedMessages);

      // setChatsStats((prev) => ({
      //   total: prev.total,
      //   read: prev.read + readCounter,
      //   unRead: prev.unRead - readCounter,
      // }));
    }
  }, [messages.length]);

  const sendMessagesRead = () => {
    if (wsConnected) {
      dispatch(
        wsSend({
          type: WS_MESSAGE_TYPE.MESSAGES_READ,
          payload: {
            chatId: currentChatId,
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (currentChatId) {
      sendMessagesRead();
    }
  }, [currentChatId, wsConnected]);
};
