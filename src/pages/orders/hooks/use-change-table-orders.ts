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

/**
 * Хук для повторного запроса заказов с обновлёнными параметрами.
 * Использует параметры из контекста.
 * После получения данных обновляет пагинацию.
 */
export const useRefetchTableOrders = () => {
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
        page: pageParam ?? 1,
        limit: limitParam ?? limit,
        search: searchParam ?? search,
        startDate: startDateParam ?? startDate,
        endDate: endDateParam ?? endDate,
        status: orderStatusParam ?? status,
      }),
      thenHandler: (response) => {
        setPagination({ response });
      },
    });
  };
};
