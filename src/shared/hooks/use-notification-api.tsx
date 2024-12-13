import { createContext } from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';

const Context = createContext({ name: 'Default' });

export const useNotificationApi = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({ type, message, description, placement, ...rest }: ArgsProps) => {
    let notificationApiCall = null;

    if (type === 'error') {
      notificationApiCall = api.error;
    } else if (type === 'info') {
      notificationApiCall = api.info;
    } else if (type === 'success') {
      notificationApiCall = api.success;
    } else if (type === 'warning') {
      notificationApiCall = api.warning;
    }

    notificationApiCall!({
      message,
      description: <Context.Consumer>{() => description}</Context.Consumer>,
      placement: 'bottomRight',
      ...rest,
    });
  };

  const showErrorNotification = ({ message, description, placement, ...rest }: ArgsProps) => {
    const notificationApiCall = api.error;

    notificationApiCall!({
      message,
      description: <Context.Consumer>{() => description}</Context.Consumer>,
      placement: 'bottomRight',
      // type: 'error',
      ...rest,
    });
  };

  const showSuccessNotification = ({ message, description, placement, ...rest }: ArgsProps) => {
    const successApiCall = api.success;

    successApiCall!({
      message,
      description: <Context.Consumer>{() => description}</Context.Consumer>,
      placement: 'bottomRight',
      // type: 'error',
      ...rest,
    });
  };

  const showInfoNotification = ({ message, description, placement, ...rest }: ArgsProps) => {
    const notificationApiCall = api.info;

    notificationApiCall!({
      message,
      description: <Context.Consumer>{() => description}</Context.Consumer>,
      placement: 'bottomRight',
      // type: 'error',
      ...rest,
    });
  };

  const closeNotification = (key: string) => {
    api.destroy(key);
  };

  const closeAllNotifications = () => {
    api.destroy();
  };

  return {
    showNotification,
    showInfoNotification,
    showErrorNotification,
    showSuccessNotification,
    closeNotification,
    closeAllNotifications,
    NotificationContext: () => (
      <Context.Provider value={{ name: 'snackbar_context' }}>{contextHolder}</Context.Provider>
    ),
  };
};