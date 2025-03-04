import { useOrdersContext } from '@pages/orders/context';
import { useSetPagination } from '@pages/orders/hooks';
import { useSuperDispatch } from '@shared/hooks';
import { Order, PaginationRequestQuery, PaginationResponse } from '@shared/types';
import { fetchOrders } from '@store/slices';
type Args = {
  searchParam?: string;
  endDateParam?: string;
  startDateParam?: string;
  orderStatusParam?: string[];
  limitParam?: number;
  pageParam?: number;
};

export const useChangeTableOrders = () => {
  const { limit, endDate, startDate, search, status } = useOrdersContext();
  const setPagination = useSetPagination();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Order>, PaginationRequestQuery>();

  return ({
    searchParam,
    endDateParam,
    startDateParam,
    orderStatusParam,
    limitParam,
    pageParam,
  }: Args) => {
    superDispatch({
      action: fetchOrders({
        page: pageParam === undefined ? 1 : pageParam,
        limit: limitParam === undefined ? limit : limitParam,
        search: searchParam === undefined ? search : searchParam,
        startDate: startDateParam === undefined ? startDate : startDateParam,
        endDate: endDateParam === undefined ? endDate : endDateParam,
        status: orderStatusParam === undefined ? status : orderStatusParam,
      }),
      thenHandler: (response) => {
        setPagination({ response });
      },
    });
  };
};
