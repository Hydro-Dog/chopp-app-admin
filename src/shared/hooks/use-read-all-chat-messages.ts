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
  const { setMessages, messages, setChatsStats } = useChatsContext();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentChatId === messages?.[messages?.length - 1]?.chatId) {
      let readCounter = 0;
      setMessages((prev) =>
        prev.map((item) => {
          if (item.wasReadBy.includes(currentUser?.id)) {
            return item;
          }

          readCounter = readCounter + 1;
          return { ...item, wasReadBy: [...item.wasReadBy, currentUser.id] };
        }),
      );

      setChatsStats((prev) => ({
        total: prev.total,
        read: prev.read + readCounter,
        unRead: prev.unRead - readCounter,
      }));
    }
  }, [messages?.length, messages?.[0]]);

  const sendMessagesRead = () => {
    if (wsConnected) {
      dispatch(
        wsSend({
          type: WS_MESSAGE_TYPE.MESSAGES_READ,
          payload: { currentChatId },
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
