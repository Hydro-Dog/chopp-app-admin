import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TitlePage } from '@shared/components';
import { ChatMessage, useFilterWsMessages, useThemeToken } from '@shared/index';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { AppDispatch, RootState } from '@store/index';
import { Card, Form, Splitter, Typography } from 'antd';
import classNames from 'classnames';
import {
  useClearChatMessagesStoreOnLeave,
  useFetchMessages,
  useNewIncomingMessageChatHandler,
  useReadAllChatMessages,
} from './components/hooks';
import { ChatInput, Sidebar } from './components/index';
import { useChatsContext } from './chats-context';

const { Item } = Form;
const { Text } = Typography;

export const ChatsPage = () => {
  const themeToken = useThemeToken();
  const { messages, setMessages } = useChatsContext();
  const { t } = useTranslation();
  const { chatMessages } = useSelector((state: RootState) => state.chat);
  const { currentUser } = useSelector((state: RootState) => state.user);

  //Очистка стора при уходе из компонента чата
  useClearChatMessagesStoreOnLeave();
  useFetchMessages();
  useReadAllChatMessages();
  useNewIncomingMessageChatHandler({ setMessages });

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  const getCardContainerClasses = (isUserMessage: boolean, isNewMessage = false) =>
    classNames('flex', isUserMessage ? 'justify-end' : 'justify-start', {
      'bg-slate-200': isNewMessage,
    });

  const getCardClasses = (isUserMessage: boolean) =>
    classNames('max-w-xs p-2 rounded-lg', {
      'bg-blue-500 text-white': !isUserMessage,
      'bg-gray-300 text-black': isUserMessage,
    });

  const [searchParams] = useSearchParams();
  const currentChatId = searchParams.get('id');

  useEffect(() => {
    if (currentChatId === messages?.[messages?.length - 1]?.chatId) {
      setMessages((prev) =>
        prev.map((item) =>
          item.wasReadBy.includes(currentUser?.id)
            ? item
            : { ...item, wasReadBy: [...item.wasReadBy, currentUser.id] },
        ),
      );
    }
  }, [messages]);

  return (
    <TitlePage title={t('Chat')}>
      <Splitter className="h-5/6" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel defaultSize="25%" min="10%" max="50%">
          <Sidebar />
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="flex flex-col h-full">
            <div className="flex flex-col p-4 gap-2 overflow-y-auto flex-grow shrink">
              {messages?.map((message) => {
                const isUserMessage = message?.senderId !== currentUser?.id;

                return (
                  <div
                    key={message?.messageId}
                    className={getCardContainerClasses(
                      isUserMessage,
                      !message?.wasReadBy?.includes(currentUser?.id),
                    )}>
                    <Card className={getCardClasses(isUserMessage)}>
                      <Text>{message?.text}</Text>
                      <Text className="block text-xs mt-1 text-gray-600">
                        {!!message?.timeStamp && new Date(message?.timeStamp).toLocaleString()}
                      </Text>
                    </Card>
                  </div>
                );
              })}
            </div>

            <ChatInput />
          </div>
        </Splitter.Panel>
      </Splitter>
    </TitlePage>
  );
};
