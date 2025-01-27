import { createFetchPaginationListThunkAction } from '@shared/index';
import { ErrorResponse, Order, SearchRequestParams } from '@shared/types';

// // Пример использования функции для создания thunk-запроса к orders
export const fetchOrders = createFetchPaginationListThunkAction<
  Order,
  { categoryId: string } & SearchRequestParams,
  ErrorResponse
>({
  actionName: 'orders/fetchOrders',
  endpoint: '/orders',
});
