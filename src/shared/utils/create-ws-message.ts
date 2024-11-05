import { WsMessage } from '@shared/types/ws-message';

export const createWsMessage = ({
  type,
  code,
  message,
  payload,
}: Omit<WsMessage, 'timeStamp'>) => ({
  type,
  code,
  message,
  timeStamp: new Date().valueOf(),
  payload,
});
