import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TitlePage } from '@shared/index';
import { PaginationQuery, PaginationResponse, Order } from '@shared/types';
import { AppDispatch, RootState } from '@store/index';
import { fetchOrders } from '@store/slices';
import { Card } from 'antd';
import { OrdersTable } from './components';
import { useNewOrderNotificationHandler } from './hooks';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { newOrder, orderStatus } = useSelector((state: RootState) => state.notifications);

  console.log('notifications: ', newOrder);

  const [ordersData, setOrdersData] = useState<PaginationResponse<Order>>({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });

  useNewOrderNotificationHandler({ setOrdersData });

  const [queryParams, setQueryParams] = useState<PaginationQuery>({
    page: 1,
    limit: 10,
  });

  const fetchOrdersData = async (params: PaginationQuery) => {
    const result = await dispatch(fetchOrders(params)).unwrap();
    setOrdersData(result);
  };

  useEffect(() => {
    fetchOrdersData(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (newOrder) {
    }
  }, []);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
  };

  return (
    <TitlePage title={t('ORDERS')}>
      <Card className="h-full" size="small">
        <OrdersTable
          data={ordersData}
          fetchData={fetchOrdersData}
          onPaginationChange={handlePaginationChange}
        />
      </Card>
    </TitlePage>
  );
};
