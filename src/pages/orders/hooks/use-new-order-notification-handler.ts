import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PaginationResponse, Order } from '@shared/types';
import { RootState } from '@store/store';

type Args = {
  setOrdersData: Dispatch<SetStateAction<PaginationResponse<Order>>>;
};

/**
 * Хук отслеживает появление новых заказов через redux-состояние уведомлений
 * и добавляет их в начало текущего списка заказов, если таких ещё нет.
 * Используется в списке заказов для отображения в реальном времени.
 */
export const useNewOrderNotificationHandler = ({ setOrdersData }: Args) => {
  // TODO: заменить на useWsNotification из клиентского приложения, когда будет готов
  const { newOrder } = useSelector((state: RootState) => state.notifications);
  const lastNotification = newOrder?.[newOrder.length - 1]?.payload;

  useEffect(() => {
    if (!lastNotification) return;

    setOrdersData((prevData) => {
      const orderExists = prevData.items.some((order) => order.id === lastNotification.id);

      if (orderExists) return prevData;

      return {
        ...prevData,
        items: [lastNotification, ...prevData.items],
        totalItems: prevData.totalItems + 1,
      };
    });
  }, [lastNotification]);
};
