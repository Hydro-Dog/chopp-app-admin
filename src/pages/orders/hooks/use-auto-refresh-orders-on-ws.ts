import { useEffect } from 'react';
import { useWsNotification } from '@shared/index';
import { Order } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export const useAutoRefreshOrdersOnWs = ({
  refetch,
  deps,
}: {
  refetch: () => void;
  deps: unknown[];
}) => {
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(WS_MESSAGE_TYPE.NEW_ORDER);
  const { lastMessage: orderStatusNotification } = useWsNotification<Order>(
    WS_MESSAGE_TYPE.ORDER_STATUS,
  );

  console.log('newOrderNotification: ', newOrderNotification);
  console.log('orderStatusNotification: ', orderStatusNotification);

  useEffect(() => {
    if (newOrderNotification || orderStatusNotification) {
      console.log('refetch!!!');
      refetch();
    }
  }, [newOrderNotification, orderStatusNotification, ...deps]);
};
