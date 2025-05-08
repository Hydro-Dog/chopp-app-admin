import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, useNotificationContext, useWsNotification } from '@shared/index';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const useNewOrderNotification = () => {
  const { t } = useTranslation();
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(WS_MESSAGE_TYPE.NEW_ORDER);

  const { showSuccessNotification } = useNotificationContext();

  useEffect(() => {
    if (newOrderNotification) {
      showSuccessNotification({
        message: t('NEW_ORDER_NOTIFICATION_TITLE'),
        description: t('NEW_ORDER_NOTIFICATION_AMOUNT', {
          amount: newOrderNotification?.payload?.totalPrice,
        }),
        placement: 'topRight',
      });
    }
  }, [newOrderNotification]);
};
