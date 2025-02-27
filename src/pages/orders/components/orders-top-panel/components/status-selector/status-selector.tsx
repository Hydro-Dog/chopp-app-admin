import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { ChoppOrderStatus } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { useSuperDispatch } from '@shared/hooks';
import { Order, PaginationRequestQuery, PaginationResponse } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { Checkbox, Select } from 'antd';

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
    search,
    endDate,
    startDate,
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
        search: search,
        startDate: startDate,
        endDate: endDate,
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
    console.log(value);

    setOrdersStatus(value);
  };

  const chooseAllStatus = () => {
    if (ordersStatus?.length === Object.values(ORDER_STATUS).length) {
      return setOrdersStatus([]);
    } else setOrdersStatus(Object.values(ORDER_STATUS));
  };

  return (
    <>
      <div className="flex mb-3 items-center">
        <Select
          prefix={t('ORDERS_PAGE.CHOSEN_STATUS')}
          defaultValue={items.map((item) => item.value)}
          value={ordersStatus}
          mode="multiple"
          className=" w-3/4 mr-3"
          onChange={changeRangeStatus}
          options={items}
          showSearch={false}
        />
        <Checkbox
          checked={ordersStatus?.length === Object.values(ORDER_STATUS).length}
          className="w-1/4"
          onChange={chooseAllStatus}>
          {t('ORDERS_PAGE.CHOOSE_ALL')}
        </Checkbox>
      </div>
    </>
  );
};
