import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { createWsMessage } from '@shared/utils';
import { RootState, AppDispatch } from '@store/index';
import { wsSend } from '@store/slices';
import TextArea from 'antd/es/input/TextArea';
import { timeStamp } from 'console';

type Props = {
  setMessages: any;
};

export const ChatInput = ({ setMessages }: Props) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSendMessage = () => {
    if (text.trim()) {
      // Создаем и отправляем ws-сообщение
      const newMessage = {
        type: WS_MESSAGE_TYPE.MESSAGE,
        payload: {
          timeStamp: Date.now(),
          text,
          senderId: currentUser?.id,
          receiverId: searchParams.get('id'),
        },
      };
      dispatch(wsSend(newMessage));
      setText(''); // Очистка TextArea после отправки сообщения
      //Обновить открытые сообщения
      setMessages((prev) => [...prev, newMessage.payload]);
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
