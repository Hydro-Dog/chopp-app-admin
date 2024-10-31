import { useSelector } from 'react-redux';
import { WsMessage } from '@shared/types/ws-message';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState } from '@store/index';

export const useFilterWsMessages = <T>(type: WS_MESSAGE_TYPE) => {
  // Используем селектор с указанием, что messages это массив WsMessage<T>
  const messages = useSelector<RootState, WsMessage<T>[]>((state: RootState) => state.ws.messages);

  // Фильтруем сообщения по типу
  const typedMessages = messages.filter((item: WsMessage<T>) => item.type === type);

  // Получаем последнее сообщение из отфильтрованных
  const lastMessage = typedMessages[typedMessages.length - 1] || null;

  return { messages: typedMessages, lastMessage };
};
