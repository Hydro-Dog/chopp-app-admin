import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { useSuperDispatch } from '@shared/hooks';
import { Order, PaginationRequestQuery, PaginationResponse } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
const { RangePicker } = DatePicker;

export const DateSelector = () => {
  const {
    limit,
    setLimit,
    setPage,
    setPageOrders,
    setTotalItems,
    setTotalPages,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useOrdersContext();

  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Order>, PaginationRequestQuery>();

  useEffect(() => {
    superDispatch({
      action: fetchOrders({
        page: 1,
        limit: limit,
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
  }, [startDate, endDate]);

  const changeDate: RangePickerProps['onChange'] = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  return (
    <RangePicker
      className="min-w-56"
      placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
      format="YYYY-MM-DD"
      onChange={changeDate}
    />
  );
};
