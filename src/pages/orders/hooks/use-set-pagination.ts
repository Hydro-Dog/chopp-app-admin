import { Order, PaginationResponse } from '@shared/types';
import { useOrdersContext } from '../context';
type Args = {
  response: PaginationResponse<Order>;
};

export const useSetPagination = () => {
  const { setLimit, setPage, setPageOrders, setTotalItems, setTotalPages } = useOrdersContext();
  return ({ response }: Args) => {
    setPageOrders(response.items);
    setPage(response.pageNumber);
    setTotalPages(response.totalPages);
    setTotalItems(response.totalItems);
    setLimit(response.limit);
  };
};
