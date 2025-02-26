import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { useSuperDispatch } from '@shared/hooks';
import { Order, PaginationRequestQuery, PaginationResponse } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { Select } from 'antd';

export const StatusSelector = () => {
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Order>, PaginationRequestQuery>();
  const {
    limit,
    setLimit,
    setPage,
    setPageOrders,
    setTotalItems,
    setTotalPages,
    ordersStatus,
    setOrdersStatus,
  } = useOrdersContext();

  const items = Object.values(ORDER_STATUS).map((status) => ({
    value: status,
    label: <ChoppOrderStatus status={status} />,
  }));

  useEffect(() => {
    superDispatch({
      action: fetchOrders({
        page: 1,
        limit: limit,
        //ordersStatus: ordersStatus,
      }),
      thenHandler: (response) => {
        setPageOrders(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  }, [ordersStatus]);

  const changeRangeStatus = (value: ORDER_STATUS | ORDER_STATUS[]) => {
    setOrdersStatus(value);
  };

  return (
    <Select
      prefix={t('ORDERS_PAGE.CHOOSE_STATUS')}
      defaultValue={items.map((item) => item.value)}
      mode="multiple"
      className="w-auto mb-3"
      onChange={changeRangeStatus}
      options={items}
    />
  );
};
