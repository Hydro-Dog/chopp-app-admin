// export enum WS_MESSAGE_TYPE {
//   CHAT_HISTORY = 'chatHistory',
//   CHAT_MESSAGE = 'chatMessage',
//   CALL_STATUS = 'callStatus',
//   GET_CALL_HISTORY_STATS = 'getCallHistoryStats',
//   CALL_HISTORY_STATS = 'ordersStats',
//   GET_NEW_ORDER = 'getNewActivity',
//   NEW_ORDER = 'newActivity',
//   GET_CHAT_STATS = 'getChatStats',
//   CHAT_STATS = 'chatStats',
//   GET_CHAT_MESSAGES_HISTORY = 'getChatMessagesHistory',
//   CHAT_MESSAGES_HISTORY = 'chatMessagesHistory',
//   // USER_MESSAGE = "userMessage",
//   // SUPPORT_MESSAGE = "supportMessage",
//   NEW_MESSAGE = 'newMessage',
//   MESSAGE = 'message',
//   TYPING = 'typing',
//   MESSAGES_READ = 'messagesRead',
// }

export enum WS_MESSAGE_TYPE {
  NEW_ORDER = 'newOrder',
  NEW_PAYMENT = 'newPayment',
  ORDER_STATUS = 'orderStatus',
  PAYMENT_STATUS = 'paymentStatus',
  MESSAGE = 'message',
  MESSAGES_READ = 'messagesRead',
}
