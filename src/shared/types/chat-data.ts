import { ChatMessage } from './chat-message';

export type ChatData = {
  id: string;
  userId: string;
  fullName: string;
  lastMessage: ChatMessage;
};
