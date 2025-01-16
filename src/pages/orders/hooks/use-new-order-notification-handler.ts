import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PaginationResponse, Order } from '@shared/types';
import { RootState } from '@store/store';

type Args = {
  setOrdersData: Dispatch<SetStateAction<PaginationResponse<Order>>>;
};

export const useNewOrderNotificationHandler = ({ setOrdersData }: Args) => {
  const { newOrder } = useSelector((state: RootState) => state.notifications);
  const lastNotification = newOrder[newOrder?.length - 1]?.payload

  useEffect(() => {
    if (lastNotification) {
      setOrdersData((prevData) => {
        // Проверяем, есть ли уже элемент с таким ID
        const orderExists = prevData.items.some((order) => order.id === lastNotification.id);

        if (!orderExists) {
          // Добавляем новый заказ в начало списка
          return {
            ...prevData,
            items: [lastNotification, ...prevData.items],
            totalItems: prevData.totalItems + 1, // Увеличиваем общее количество
          };
        }

        // Если заказ уже существует, возвращаем прежнее состояние
        return prevData;
      });
    }
  }, [lastNotification]);
};
