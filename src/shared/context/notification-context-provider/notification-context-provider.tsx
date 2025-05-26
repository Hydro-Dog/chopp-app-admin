/* eslint-disable prettier/prettier */
import { PropsWithChildren, createContext, useContext } from 'react';
import { ArgsProps } from 'antd/es/notification';

type ShowNotificationType = ArgsProps & { muted?: boolean };

type NotificationContextType = {
  showNotification: ({ type, message, description, placement, ...rest }: ShowNotificationType ) => void;
  showErrorNotification: ({ message, description, placement, ...rest }: ShowNotificationType ) => void;
  showInfoNotification: ({ message, description, placement, ...rest }: ShowNotificationType) => void;
  showSuccessNotification: ({ message, description, placement, ...rest }: ShowNotificationType) => void;
  closeNotification: (key: string) => void;
  closeAllNotifications: () => void;
  isMute: boolean;
  mute: () => void;
  unmute: () => void;
};

const notificationContextTypeInitialValue = {
  showNotification: () => null,
  closeNotification: () => null,
  closeAllNotifications: () => null,
  showErrorNotification: () => null,
  showInfoNotification: () => null,
  showSuccessNotification: () => null,
  isMute: false,
  mute: () => null,
  unmute: () => null,
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
  isMute,
  mute,
  unmute,
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
        isMute,
        mute,
        unmute,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
