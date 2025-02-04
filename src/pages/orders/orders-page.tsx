import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  TitlePage,
  updateArrayItemById,
  useNotificationContext,
  useSuperDispatch,
} from '@shared/index';
import { PaginationQuery, PaginationResponse, Order, ORDER_STATUS } from '@shared/types';
import { AppDispatch } from '@store/index';
import { fetchOrders, updateOrderPaymentStatus } from '@store/slices';
import { Card } from 'antd';
import { OrdersTable } from './components';
import { useNewOrderNotificationHandler } from './hooks';
import { UpdateOrderDTO } from '@store/slices/orders-slice/types';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { superDispatch } = useSuperDispatch<Order, UpdateOrderDTO>();
  const { showErrorNotification } = useNotificationContext();

  const [ordersData, setOrdersData] = useState<PaginationResponse<Order>>({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });

  useNewOrderNotificationHandler({ setOrdersData });

  const fetchOrdersData = async (params: PaginationQuery) => {
    const result = await dispatch(fetchOrders(params)).unwrap();
    setOrdersData(result);
  };

  useEffect(() => {
    fetchOrdersData({ page: 1, limit: 10 });
  }, []);

  const onPaginationChange = (page: number, pageSize: number) => {};

  const onOrderStatusChange = ({
    orderStatus,
    transactionId,
  }: {
    orderStatus: ORDER_STATUS;
    transactionId: string;
  }) => {
    superDispatch({
      action: updateOrderPaymentStatus({
        transactionId,
        orderStatus,
      }),
      thenHandler: (value) => {
        setOrdersData((prev) => ({ ...prev, items: updateArrayItemById(prev.items, value) }));
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
      <Card className="h-full" size="small">
        <OrdersTable
          data={ordersData}
          fetchData={fetchOrdersData}
          onStatusChange={onOrderStatusChange}
          onPaginationChange={onPaginationChange}
        />
      </Card>
    </TitlePage>
  );
};
