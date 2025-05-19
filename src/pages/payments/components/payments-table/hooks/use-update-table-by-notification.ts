import { useEffect } from 'react';
import { usePaymentsContext } from '@pages/payments/context';
import { useWsNotification } from '@shared/hooks';
import { Payment } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const useUpdateTableByNotification = () => {
  const { list, setList } = usePaymentsContext();

  const { lastMessage: newPaymentNotification } = useWsNotification<Payment>(
    WS_MESSAGE_TYPE.NEW_PAYMENT,
  );

  const { lastMessage: orderStatusNotification } = useWsNotification<Payment>(
    WS_MESSAGE_TYPE.ORDER_STATUS,
  );

  // Добавление нового платежа в начало списка
  useEffect(() => {
    if (
      newPaymentNotification?.payload?.id &&
      !list.map((item) => item.id).includes(newPaymentNotification.payload.id)
    ) {
      setList((prev) => [newPaymentNotification!.payload!, ...prev]);
    }
  }, [newPaymentNotification?.payload]);

  // Обновление статуса существующего платежа
  useEffect(() => {
    if (!orderStatusNotification?.payload?.id) return;

    setList((prev) =>
      prev.map((item) =>
        item.id === orderStatusNotification!.payload!.id
          ? { ...item, ...orderStatusNotification.payload }
          : item,
      ),
    );
  }, [orderStatusNotification?.payload]);
};
