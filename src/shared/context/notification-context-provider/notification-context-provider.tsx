/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext } from 'react';
import { ArgsProps } from 'antd/es/notification';

type NotificationContextType = {
  showNotification: ({ type, message, description, placement, ...rest }: ArgsProps) => void;
  showErrorNotification: ({ message, description, placement, ...rest }: ArgsProps) => void;
  showInfoNotification: ({ message, description, placement, ...rest }: ArgsProps) => void;
  showSuccessNotification: ({ message, description, placement, ...rest }: ArgsProps) => void;
  closeNotification: (key: string) => void;
  closeAllNotifications: () => void;
};

const notificationContextTypeInitialValue = {
  showNotification: () => null,
  closeNotification: () => null,
  closeAllNotifications: () => null,
  showErrorNotification: () => null,
  showInfoNotification: () => null,
  showSuccessNotification: () => null,
};

const NotificationContext = createContext<NotificationContextType>(
  notificationContextTypeInitialValue,
);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({
  children,
  showNotification,
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
  closeNotification,
  closeAllNotifications,
}: PropsWithChildren<NotificationContextType>) => {
  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        closeNotification,
        closeAllNotifications,
        showErrorNotification,
        showInfoNotification,
        showSuccessNotification,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};