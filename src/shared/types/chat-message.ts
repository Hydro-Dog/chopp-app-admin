export type ChatMessage = {
  messageId?: string;
  senderId: string;
  text: string;
  timeStamp?: number;
  wasReadBy: string[];
  chatId: string;
};
