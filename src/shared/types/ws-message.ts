import { WS_MESSAGE_TYPE } from "./ws-message-type";

export type WsMessage<T = Record<string, any>> = {
  type: WS_MESSAGE_TYPE;
  // TODO: code удалить, не используется
  code?: string;
  message?: string;
  timeStamp: number;
  payload?: T; // Использование T для поля payload
};
