import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TitlePage,
  useNotificationContext,
  useShowTotalPaginationOrders,
  useSuperDispatch,
  useWsNotification,
} from '@shared/index';
import { Order, ORDER_STATUS } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { updateOrderPaymentStatus } from '@store/slices';
import { UpdateOrderDTO } from '@store/slices/orders-slice/types';
import { Card, Flex, Pagination, Space } from 'antd';
import { OrdersTable } from './components';
import { OrdersTopPanel } from './components/orders-top-panel';
import { useOrdersContext } from './context';
import { useAutoRefreshOrdersOnWs, useRefetchTableOrders } from './hooks';

/**
 * Страница заказов.
 * Показывает таблицу заказов с фильтрацией, пагинацией и автообновлением по WebSocket.
 */
export const OrdersPage = () => {
  const { limit, page, pageOrders, totalItems, totalPages, search, endDate, startDate, status } =
    useOrdersContext();

  const refetchTableOrders = useRefetchTableOrders();
  const showTotal = useShowTotalPaginationOrders();
  const { t } = useTranslation();
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(WS_MESSAGE_TYPE.NEW_ORDER);
  const { showErrorNotification } = useNotificationContext();

  const updatePaymentDispatch = useSuperDispatch<Order, UpdateOrderDTO>();

  // Обновление таблицы при получении нового заказа или обновления платежа через WS
  // useEffect(() => {
  //   if (!newOrderNotification && !newPaymentNotification) return;

  //   refetchTableOrders({
  //     pageParam: page,
  //     limitParam: limit,
  //     searchParam: search,
  //     endDateParam: endDate,
  //     startDateParam: startDate,
  //     orderStatusParam: status,
  //   });
  // }, [
  //   newOrderNotification,
  //   newPaymentNotification,
  //   page,
  //   limit,
  //   search,
  //   startDate,
  //   endDate,
  //   status,
  // ]);

  useAutoRefreshOrdersOnWs({
    refetch: () =>
      refetchTableOrders({
        pageParam: page,
        limitParam: limit,
        searchParam: search,
        endDateParam: endDate,
        startDateParam: startDate,
        orderStatusParam: status,
      }),
    deps: [page, limit, search, startDate, endDate, status],
  });

  // Первый fetch при монтировании страницы
  useEffect(() => {
    refetchTableOrders({});
  }, []);

  const handlePaginationChange = (page: number, size: number) => {
    refetchTableOrders({ pageParam: page, limitParam: size });
  };

  const handleOrderStatusChange = ({
    orderStatus,
    transactionId,
  }: {
    orderStatus: ORDER_STATUS;
    transactionId: string;
  }) => {
    updatePaymentDispatch.superDispatch({
      action: updateOrderPaymentStatus({ transactionId, orderStatus }),
      thenHandler: () => refetchTableOrders({}),
      catchHandler: (error) => {
        showErrorNotification({
          message: t('ERROR'),
          description: error.message,
        });
      },
    });
  };

  return (
    <TitlePage title={t('ORDERS')}>
      <Card
        className="min-h-full flex flex-col"
        size="small"
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        }}>
        <OrdersTopPanel />

        <Flex vertical justify="space-between" flex={1}>
          <OrdersTable data={pageOrders} onStatusChange={handleOrderStatusChange} />

          <Space className="w-full px-3 pt-2">
            <div>
              {t('TOTAL_PAGES')}: {totalPages}
            </div>
            <Pagination
              size="small"
              current={page}
              pageSizeOptions={[2, 8, 12, 22]}
              pageSize={limit}
              total={totalItems}
              onChange={handlePaginationChange}
              showTotal={showTotal}
              showSizeChanger
              showQuickJumper
            />
          </Space>
        </Flex>
      </Card>
    </TitlePage>
  );
};
