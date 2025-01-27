import { ChatMessage } from './chat-message';

export type Chat = {
  id: string;
  userId: string;
  fullName: string;
  lastMessage: ChatMessage;
};
