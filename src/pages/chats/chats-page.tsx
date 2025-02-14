import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TitlePage } from '@shared/components';
import { useThemeToken } from '@shared/index';
import { RootState } from '@store/index';
import { Card, Form, Splitter, Typography } from 'antd';
import classNames from 'classnames';
import { useChatsContext } from './chats-context';
import { ChatInput, Sidebar } from './components/index';
import {
  useClearChatMessagesStoreOnLeave,
  useFetchMessages,
  useNewIncomingMessageChatHandler,
  useReadAllChatMessages,
} from '../../shared/hooks/index';

const { Text } = Typography;

export const ChatsPage = () => {
  const themeToken = useThemeToken();
  const { messages, setMessages } = useChatsContext();
  const { chatMessages } = useSelector((state: RootState) => state.chatsRepository);
  const { currentUser } = useSelector((state: RootState) => state.user);

  //Очистка стора при уходе из компонента чата
  useClearChatMessagesStoreOnLeave();
  useFetchMessages();
  // useReadAllChatMessages();

  // сейчас новое сообщение добавляется через стор в chats.newChatMessages
  // useNewIncomingMessageChatHandler();

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  const getCardContainerClasses = (isUserMessage: boolean, isNewMessage = false) =>
    classNames('flex', !isUserMessage ? 'justify-end' : 'justify-start', {
      'bg-slate-200': isNewMessage,
    });

  const getCardClasses = (isUserMessage: boolean) =>
    classNames('max-w-xs p-2 rounded-lg', {
      'bg-blue-500 text-white': isUserMessage,
      'bg-gray-300 text-black': !isUserMessage,
    });

  return (
    <Splitter>
      <Splitter.Panel defaultSize="25%" min="10%" max="50%">
        <Sidebar />
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="flex flex-col h-full p-1">
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
                  <Card
                    size="small"
                    className="max-w-xs p-2 rounded-lg drop-shadow-lg"
                    style={{
                      color: isUserMessage
                        ? themeToken.colorPrimaryText
                        : themeToken.colorPrimaryText,
                      background: isUserMessage
                        ? themeToken.colorPrimaryBg
                        : themeToken.colorBgContainer,
                    }}>
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
  );
};
