import { WsMessage } from '@shared/types/ws-message';

export const createWsMessage = ({ type, code, message, payload }: WsMessage) => ({
  type,
  code,
  message,
  timeStamp: new Date().valueOf(),
  payload,
});
