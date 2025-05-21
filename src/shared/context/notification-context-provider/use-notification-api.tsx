import { createContext, useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@shared/enum';
import { playNotificationSound } from '@shared/utils';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';

const Context = createContext({ name: 'Notification Context' });

const useMuteState = () => {
  const [isMute, setIsMute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false; // SSR fallback
    return localStorage.getItem(STORAGE_KEYS.MUTE) === 'true'; // корректный parse
  });

  const mute = () => {
    setIsMute(true);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.MUTE, 'true');
  };

  const unmute = () => {
    setIsMute(false);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.MUTE, 'false');
  };

  return { isMute, mute, unmute };
};

/**
 * Основной хук для работы с системой уведомлений.
 * Оборачивается в NotificationContextProvider для глобального доступа.
 */
export const useNotificationApi = () => {
  const [api, contextHolder] = notification.useNotification();
  const { isMute, mute, unmute } = useMuteState();

  /**
   * Универсальный метод для показа уведомления любого типа.
   * Перед показом может проигрывать звук (если не активирован mute).
   */
  const showNotification = ({
    type = 'info',
    message,
    description,
    placement = 'bottomRight',
    muted = true,
    ...rest
  }: ArgsProps & { type?: 'success' | 'info' | 'warning' | 'error'; muted?: boolean }) => {
    if (!isMute && !muted) {
      playNotificationSound(type);
    }

    const fn = (api as any)[type];
    if (!fn) return;

    fn({
      message,
      description: <Context.Consumer>{() => description}</Context.Consumer>,
      placement,
      ...rest,
    });
  };

  const showErrorNotification = (props: ArgsProps) => showNotification({ ...props, type: 'error' });
  const showSuccessNotification = (props: ArgsProps) =>
    showNotification({ ...props, type: 'success' });
  const showInfoNotification = (props: ArgsProps) => showNotification({ ...props, type: 'info' });
  const showWarningNotification = (props: ArgsProps) =>
    showNotification({ ...props, type: 'warning' });

  const closeNotification = (key: string) => api.destroy(key);
  const closeAllNotifications = () => api.destroy();

  const NotificationContext = () => (
    <Context.Provider value={{ name: 'snackbar_context' }}>{contextHolder}</Context.Provider>
  );

  return {
    showNotification,
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
    showWarningNotification,
    closeNotification,
    closeAllNotifications,
    isMute,
    mute,
    unmute,
    NotificationContext,
  };
};
