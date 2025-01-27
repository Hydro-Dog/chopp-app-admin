export type ChatMessage = {
  messageId?: string;
  senderId: string;
  text: string;
  createdAt: number;
  wasReadBy: string[];
  chatId: string;
};
