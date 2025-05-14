import { useSelector } from 'react-redux';
import { WsMessage } from '@shared/types/ws-message';
import { RootState, NotificationsState } from '@store/index';

export const useWsNotification = <T>(type: keyof NotificationsState) => {
  const notification = useSelector<RootState, WsMessage<T>[]>(
    (state: RootState) => state.notifications[type] as WsMessage<T>[],
  );

  // console.log('notification: ', notification)

  const lastMessage = notification[notification.length - 1] || null;

  return { notification, lastMessage };
};
