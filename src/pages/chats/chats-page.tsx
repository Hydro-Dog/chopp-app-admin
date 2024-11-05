import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TitlePage } from '@shared/components';
import { useFilterWsMessages } from '@shared/hooks';
import { ChatMessagePayload, ChatsData } from '@shared/types';
import { WsMessage } from '@shared/types/ws-message';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { createWsMessage } from '@shared/utils';
import { AppDispatch, RootState } from '@store/index';
import { wsSend } from '@store/slices';
import { Card, Flex, Splitter, Typography } from 'antd';
import classNames from 'classnames';
import { Sidebar } from './components';

const { Title, Text } = Typography;

export const ChatsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { lastMessage: chatsData } = useFilterWsMessages<ChatsData[]>(WS_MESSAGE_TYPE.CHAT_STATS);
  const { lastMessage: chatsMessagesHistory } = useFilterWsMessages<
    WsMessage<ChatMessagePayload>[]
  >(WS_MESSAGE_TYPE.CHAT_MESSAGES_HISTORY);

  console.log('currentUser: ', currentUser);

  useEffect(() => {
    if (wsConnected) {
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.GET_CHAT_MESSAGES_HISTORY,
            message: searchParams.get('id') || '',
          }),
        ),
      );
    }
  }, [dispatch, searchParams, wsConnected]);

  console.log('chatsData: ', chatsData);
  console.log('chatsMessagesHistory: ', chatsMessagesHistory);

  const getCardContainerClasses = (isUserMessage: boolean, isNewMessage = false) =>
    classNames('flex', isUserMessage ? 'justify-end' : 'justify-start', {
      'bg-slate-200': isNewMessage,
    });

  const getCardClasses = (isUserMessage: boolean) =>
    classNames('max-w-xs p-2 rounded-lg', {
      'bg-blue-500 text-white': isUserMessage,
      'bg-gray-300 text-black': !isUserMessage,
    });

  return (
    <TitlePage title={t('Chat')}>
      <Splitter className="h-5/6" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel defaultSize="25%" min="10%" max="50%">
          <Sidebar />
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="flex flex-col p-4 gap-2 overflow-auto h-full">
            {chatsMessagesHistory?.payload?.map((message) => {
              const isUserMessage = message?.payload?.senderId !== currentUser?.id; // '111' - ID администратора
              return (
                <div
                  key={message?.payload?.messageId}
                  className={getCardContainerClasses(isUserMessage, message.payload?.wasRead)}>
                  <Card className={getCardClasses(isUserMessage)}>
                    <Text>{message.message}</Text>
                    <Text className="block text-xs mt-1 text-gray-600">
                      {new Date(message.timeStamp).toLocaleString()}
                    </Text>
                  </Card>
                </div>
              );
            })}
          </div>
        </Splitter.Panel>
      </Splitter>
    </TitlePage>
  );
};
