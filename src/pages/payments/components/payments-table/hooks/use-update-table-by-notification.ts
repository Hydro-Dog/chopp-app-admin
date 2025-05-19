import { useEffect } from 'react';
import { usePaymentsContext } from '@pages/payments/context';
import { useWsNotification } from '@shared/hooks';
import { Order, Payment } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const useUpdateTableByNotification = () => {
  const { list, setList } = usePaymentsContext();

  const { lastMessage: newPaymentNotification } = useWsNotification<Payment>(
    WS_MESSAGE_TYPE.NEW_PAYMENT,
  );

  const { lastMessage: orderStatusNotification } = useWsNotification<Order>(
    WS_MESSAGE_TYPE.ORDER_STATUS,
  );

  console.log('🔔 newPaymentNotification:', newPaymentNotification);
  console.log('🔁 orderStatusNotification:', orderStatusNotification);

  // Добавление нового платежа в начало списка
  useEffect(() => {
    if (
      newPaymentNotification?.payload?.id &&
      !list.some((item) => item.id === newPaymentNotification!.payload!.id)
    ) {
      console.log('➕ Добавляем новый платеж:', newPaymentNotification.payload.id);
      setList((prev) => [newPaymentNotification.payload!, ...prev]);
    }
  }, [newPaymentNotification?.payload]);

  // Обновление статуса платежа
  useEffect(() => {
    const incoming = orderStatusNotification?.payload;
    if (!incoming?.transactionId) return;

    console.log('🔄 Обновляем статус для заказа:', incoming.transactionId, '->', incoming.paymentStatus);

    setList((prev) =>
      prev.map((item) => {
        if (item.id === incoming.transactionId) {
          console.log('✅ Найден элемент, обновляем статус:', {
            old: item.status,
            new: incoming.paymentStatus,
          });
          return { ...item, status: incoming.paymentStatus };
        }
        return item;
      }),
    );
  }, [orderStatusNotification?.payload]);
};
