import { WsMessage } from '@shared/types/ws-message';

export const createWsMessage = ({ type, payload }: Omit<WsMessage, 'timeStamp'>) => ({
  type,
  payload,
});
