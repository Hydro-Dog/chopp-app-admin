import { ChatMessagePayload } from './chat-message-payload';
import { WsMessage } from './ws-message';

export type ChatsData = {
  userId: string;
  fullName: string;
  hasUnreadMessages: boolean;
  lastMessage: WsMessage<ChatMessagePayload>;
};
