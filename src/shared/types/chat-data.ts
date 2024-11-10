import { ChatMessage } from './chat-message';

export type ChatData = {
  chatId: string;
  userId: string;
  fullName: string;
  lastMessage: ChatMessage;
};
