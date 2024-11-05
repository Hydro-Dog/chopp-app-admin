import { ChatMessagePayload } from './chat-message-payload';
import { WsMessage } from './ws-message';

export type ChatsData = {
  userId: string;
  userName: string;
  hasUnreadMessages: boolean;
  lastMessage: WsMessage<ChatMessagePayload>;
};
