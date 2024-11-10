import { WS_MESSAGE_TYPE } from "./ws-message-type";

export type WsMessage<T = Record<string, any>> = {
  type: WS_MESSAGE_TYPE;
  payload?: T;
};
