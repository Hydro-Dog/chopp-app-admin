import { useSelector } from 'react-redux';
import { WsMessage } from '@shared/types/ws-message';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState } from '@store/index';
import { ChatMessage } from '@shared/types';

export const useFilterWsMessages = <T>(type: WS_MESSAGE_TYPE) => {
  // Используем селектор с указанием, что messages это массив WsMessage<T>
  const messages = useSelector<RootState, ChatMessage[]>((state: RootState) => state.chatsRepository.chatMessages);

  // TODO: лучше сделать это не здесь, если ожидаем другой тип сообщения, то нужен event не message
  // const typedMessages = messages.filter((item: ChatMessage) => item.type === type);

  // Получаем последнее сообщение из отфильтрованных
  const lastMessage = messages[messages.length - 1] || null;

  return { messages, lastMessage };
};
