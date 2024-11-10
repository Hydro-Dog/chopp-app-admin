export type ChatMessage = {
  messageId?: string;
  receiverId: string;
  senderId: string;
  text: string;
  timeStamp?: number;
  wasReadBy: string[];
  chatId: string;
};
