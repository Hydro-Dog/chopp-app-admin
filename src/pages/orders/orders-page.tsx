import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LIMIT } from '@pages/products/context';
import { TitlePage, useNotificationContext, useSuperDispatch } from '@shared/index';
import { PaginationResponse, Order, ORDER_STATUS, PaginationRequestQuery } from '@shared/types';
import { fetchOrders, updateOrderPaymentStatus } from '@store/slices';
import { Card, Pagination } from 'antd';
import { OrdersTable } from './components';
import { TopBar } from './components/top-panel/top-bar';
import { useOrdersContext } from './context';

export const OrdersPage = () => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    pageOrders,
    setPageOrders,
    totalItems,
    setTotalItems,
    setTotalPages,
  } = useOrdersContext();

  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Order>, PaginationRequestQuery>();
  const { showErrorNotification } = useNotificationContext();
  //TODO Тоже наверное можно как-то сделать лучше
  useEffect(() => {
    superDispatch({
      action: fetchOrders({
        //Для тестов. Так лимит я думаю нужно делать 6-8
        page: 1,
        limit: LIMIT,
      }),
      thenHandler: (response) => {
        setPageOrders(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  }, []);

  const onPaginationChange = (page: number, size: number) => {
    superDispatch({
      action: fetchOrders({
        page: size !== limit ? 1 : page,
        limit: size,
      }),
      thenHandler: (response) => {
        setPageOrders(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  };

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
      thenHandler: () => {
        //TODO изменить логику чтобы не перегружать сервер запросами
        superDispatch({
          action: fetchOrders({
            page: page,
            limit: limit,
          }),
          thenHandler: (response) => {
            console.log(response.pageNumber, page);

            setPageOrders(response.items);
            setPage(response.pageNumber);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
            setLimit(response.limit);
          },
        });
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
        <TopBar />
        <OrdersTable data={pageOrders} onStatusChange={onOrderStatusChange} />
        <Pagination
          size="small"
          current={page}
          pageSizeOptions={[2, 8, 12, 22]}
          pageSize={limit}
          total={totalItems}
          onChange={onPaginationChange}
          showSizeChanger
          showQuickJumper
        />
      </Card>
    </TitlePage>
  );
};
