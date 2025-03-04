import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage, useNotificationContext, useSuperDispatch } from '@shared/index';
import { Order, ORDER_STATUS } from '@shared/types';
import { updateOrderPaymentStatus } from '@store/slices';
import { UpdateOrderDTO } from '@store/slices/orders-slice/types';
import { Card, Pagination } from 'antd';
import { OrdersTable } from './components';
import { ShowTotalItems } from './components/orders-table/components';
import { OrdersTopPanel } from './components/orders-top-panel';
import { useOrdersContext } from './context';
import { useChangeTableOrders } from './hooks';

export const OrdersPage = () => {
  const { limit, page, pageOrders, totalItems } = useOrdersContext();
  const changeTableOrders = useChangeTableOrders();

  const showTotalItems = ShowTotalItems(totalItems);

  const { t } = useTranslation();
  const updatePaymentDispatch = useSuperDispatch<Order, UpdateOrderDTO>();
  const { showErrorNotification } = useNotificationContext();

  useEffect(() => {
    changeTableOrders({});
  }, []);

  const onPaginationChange = (page: number, size: number) => {
    changeTableOrders({ pageParam: page, limitParam: size });
  };

  const onOrderStatusChange = ({
    orderStatus,
    transactionId,
  }: {
    orderStatus: ORDER_STATUS;
    transactionId: string;
  }) => {
    updatePaymentDispatch.superDispatch({
      action: updateOrderPaymentStatus({
        transactionId,
        orderStatus,
      }),
      thenHandler: () => {
        changeTableOrders({});
      },
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
      <Card className="h-full relative" size="small">
        <OrdersTopPanel />
        <OrdersTable data={pageOrders} onStatusChange={onOrderStatusChange} />
        <Pagination
          size="small"
          current={page}
          pageSizeOptions={[2, 8, 12, 22]}
          pageSize={limit}
          //showTotal={showTotalItems}
          total={totalItems}
          onChange={onPaginationChange}
          showSizeChanger
          showQuickJumper
          className="absolute bottom-0 left-0 w-full justify-center pb-3"
        />
      </Card>
    </TitlePage>
  );
};
