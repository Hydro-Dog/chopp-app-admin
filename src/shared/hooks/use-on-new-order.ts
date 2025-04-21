import { useEffect } from 'react';
import { Order } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { useWsNotification } from './use-ws-notification';

/**
 * Аргументы хука useOnNewOrder
 */
type Args = {
  /** Коллбэк, вызываемый при получении нового заказа */
  cb: () => void;
  /** Массив зависимостей для useEffect */
  deps: React.DependencyList;
};

/**
 * Хук подписывается на WebSocket-сообщения о новых заказах
 * и вызывает переданный коллбэк при получении такого сообщения.
 *
 * @param cb - функция, которая будет вызвана при поступлении нового заказа
 * @param deps - зависимости, при изменении которых useEffect перезапускается
 */
export const useOnNewOrder = ({ cb, deps }: Args): void => {
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(WS_MESSAGE_TYPE.NEW_ORDER);

  useEffect(() => {
    if (newOrderNotification) {
      cb();
    }
  }, deps);
};
