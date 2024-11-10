import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { AppDispatch, RootState } from '@store/index';
import { wsSend } from '@store/slices';

export const useReadAllChatMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');

  const sendMessagesRead = () => {
    if (wsConnected) {
      dispatch(
        wsSend({
          type: WS_MESSAGE_TYPE.MESSAGE_READ,
          payload: { currentChatId },
        }),
      );
    }
  };

  useEffect(() => {
    if (currentChatId) {
      sendMessagesRead();
    }
  }, [currentChatId]);
};
