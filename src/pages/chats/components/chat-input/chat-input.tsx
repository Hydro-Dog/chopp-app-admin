import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useChatsContext } from '@pages/chats/chats-context';
import { useSearchParamValue } from '@shared/index';
import { ChatMessage } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState, AppDispatch } from '@store/index';
import { wsSend } from '@store/slices';
import TextArea from 'antd/es/input/TextArea';

export const ChatInput = () => {
  const { t } = useTranslation();

  const [text, setText] = useState('');
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { setMessages, setChats } = useChatsContext();

  const urlChatId = useSearchParamValue('id');

  const handleSendMessage = () => {
    if (text.trim()) {
      // Создаем и отправляем ws-сообщение
      const newMessage = {
        type: WS_MESSAGE_TYPE.MESSAGE,
        payload: {
          timeStamp: Date.now(),
          text,
          senderId: currentUser?.id,
          chatId: urlChatId,
          wasReadBy: [currentUser?.id],
        } as ChatMessage,
      };

      dispatch(wsSend(newMessage));
      setText(''); // Очистка TextArea после отправки сообщения
      //Обновить открытые сообщения
      setMessages((prev) => {
        return [...prev, newMessage.payload];
      });
      //Обновить превью чатов сообщения
      setChats((prev) =>
        prev?.map((item) =>
          item.chatId === urlChatId ? { ...item, lastMessage: newMessage.payload } : item,
        ),
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Предотвращает добавление новой строки
      handleSendMessage();
    }
  };

  return (
    <TextArea
      rows={2}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={t('NEW_MESSAGE')}
      className="p-2 shrink-0"
    />
  );
};
