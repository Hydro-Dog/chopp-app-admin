/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext } from 'react';
import { ArgsProps } from 'antd/es/notification';

type NotificationContextType = {
  openNotification: ({ type, message, description, placement, ...rest }: ArgsProps) => void;
  closeNotification: (key: string) => void;
  closeAllNotifications: () => void;
};

const notificationContextTypeInitialValue = {
  openNotification: () => null,
  closeNotification: () => null,
  closeAllNotifications: () => null,
};

const NotificationContext = createContext<NotificationContextType>(
  notificationContextTypeInitialValue,
);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({
  children,
  openNotification,
  closeNotification,
  closeAllNotifications,
}: PropsWithChildren<NotificationContextType>) => {
  return (
    <NotificationContext.Provider
      value={{ openNotification, closeNotification, closeAllNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
