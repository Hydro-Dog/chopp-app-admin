export type ChatMessage = {
  messageId?: string;
  receiverId: string;
  senderId: string;
  text: string;
  timeStamp?: string;
  wasReadBy: string[];
  chatId: string;
};
