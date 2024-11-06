import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TitlePage } from '@shared/components';
import { AppDispatch, RootState } from '@store/index';
import { fetchChatMessages, fetchChatPreviews, wsSend } from '@store/slices';
import { Card, Flex, Splitter, Typography } from 'antd';
import classNames from 'classnames';
import { Sidebar } from './components';
import { WsMessage } from '@shared/types/ws-message';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { ChatMessagePayload, ChatsData, createWsMessage, useFilterWsMessages } from '@shared/index';

const { Title, Text } = Typography;

export const ChatsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');

  //TODO: добавить лоадер на fetchChatPreviewsStatus
  const { chatPreviews, fetchChatPreviewsStatus } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(fetchChatPreviews());
  }, [dispatch]);

  // TODO: добавить лоадер на fetchChatMessagesStatus
  const { chatMessages, fetchChatMessagesStatus } = useSelector((state: RootState) => state.chat);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { lastMessage: newMessage } = useFilterWsMessages<WsMessage<ChatMessagePayload>>(
    WS_MESSAGE_TYPE.NEW_MESSAGE,
  );

  const [messages, setMessages] = useState<WsMessage<ChatMessagePayload>[]>([]);
  const [previews, setPreviews] = useState<ChatsData[]>([]);

  useEffect(() => {
    //Отмечаем сообщения прочитанными когда открываем чат
    dispatch(
      wsSend(
        createWsMessage({
          type: WS_MESSAGE_TYPE.MESSAGE_READ,
          payload: { userId: currentChatId },
        }),
      ),
    );
  }, [currentChatId])

  useEffect(() => {
    dispatch(fetchChatMessages());
  }, [dispatch]);

  useEffect(() => {
    if (chatPreviews) {
      setPreviews(chatPreviews);
    }
  }, [chatPreviews]);

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    //Обработка нового сообщения
    //Обновляем превью в левом баре и добавляем сообщение в чат (основной бар)
    if (newMessage) {
      const senderId = newMessage.payload?.payload?.senderId;
      const receiverId = newMessage.payload?.payload?.receiverId;
      const isCurrentChat =
        String(receiverId) === String(currentChatId) || String(senderId) === String(currentChatId);

      //Обновляем превью чата
      setPreviews((prev) => {
        const updated = prev.map((item) => {
          if (
            item.userId === newMessage.payload?.payload?.senderId ||
            item.userId === newMessage.payload?.payload?.receiverId
          ) {
            return { ...item, hasUnreadMessages: !isCurrentChat, lastMessage: newMessage.payload };
          }

          return item;
        });

        return updated;
      });

      if (isCurrentChat) {
        //Значит у нас открыт чат, в который пришло новое сообщение
        //Обновить список сообщений
        setMessages((prev) => [...prev, newMessage.payload]);
        //Отправить ws-сообщение, что сообщение прочитано
        //--код--
        dispatch(
          wsSend(
            createWsMessage({
              type: WS_MESSAGE_TYPE.MESSAGE_READ,
              payload: { userId: currentChatId },
            }),
          ),
        );
      }
    }
  }, [newMessage]);

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
          <Sidebar previews={previews} />
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="flex flex-col p-4 gap-2 overflow-auto h-full">
            {messages?.map((message) => {
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
