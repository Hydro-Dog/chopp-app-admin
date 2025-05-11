import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LIMIT } from '@pages/products/context';
import { ORDER_STATUS } from '@shared/enum';
import { Order, PropsWithChildrenOnly } from '@shared/types';

type OrdersContextType = {
  pageOrders: Order[];
  setPageOrders: Dispatch<SetStateAction<Order[]>>;
  status: string[];
  setStatus: Dispatch<SetStateAction<string[]>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalItems: number;
  setTotalItems: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

/**
 * Провайдер контекста заказов.
 * Содержит и синхронизирует фильтры, пагинацию, даты и статус заказов
 * через URL-параметры и локальный стейт.
 */
export const OrdersProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialLimit = Number(searchParams.get('limit')) || LIMIT;
  const initialSearch = searchParams.get('search') || '';
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialStartDate = searchParams.get('startDate') || '';
  const initialEndDate = searchParams.get('endDate') || '';
  const initialStatus = searchParams.get('status')
    ? searchParams
        .get('status')!
        .split(',')
        .filter((status) => Object.values(ORDER_STATUS).includes(status as ORDER_STATUS))
    : [];

  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [status, setStatus] = useState(initialStatus);

  const [pageOrders, setPageOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Синхронизация параметров фильтрации и пагинации с URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(limit));
    params.set('search', search);
    params.set('status', status.join(','));
    params.set('startDate', startDate);
    params.set('endDate', endDate);
    params.set('page', String(page));

    setSearchParams(params);
  }, [limit, search, page, startDate, endDate, status, setSearchParams]);

  return (
    <OrdersContext.Provider
      value={{
        pageOrders,
        setPageOrders,
        page,
        setPage,
        totalPages,
        setTotalPages,
        totalItems,
        setTotalItems,
        search,
        setSearch,
        limit,
        setLimit,
        endDate,
        setEndDate,
        startDate,
        setStartDate,
        status,
        setStatus,
      }}>
      {children}
    </OrdersContext.Provider>
  );
};

/**
 * Хук для доступа к OrdersContext.
 * Бросает ошибку, если используется вне провайдера.
 */
export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrdersContext must be used within an OrdersProvider');
  }
  return context;
};
