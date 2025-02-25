import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FIRST_PAGE_NUMBER, LIMIT } from '@pages/products/context';
import { ORDER_STATUS } from '@shared/enum';
import { Order, PropsWithChildrenOnly } from '@shared/types';

type OrdersContextType = {
  pageOrders: Order[];
  setPageOrders: Dispatch<SetStateAction<Order[]>>;
  statusOfOrders: ORDER_STATUS | ORDER_STATUS[];
  setStatusOfOrders: Dispatch<SetStateAction<ORDER_STATUS | ORDER_STATUS[]>>;
  priceOfOrders: { from: number; to: number };
  setPriceOfOrders: Dispatch<SetStateAction<{ from: number; to: number }>>;
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
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLimit = Number(searchParams.get('limit')) || LIMIT;
  const initialSearch = searchParams.get('search') || '';
  const initialStatusOfOrder = searchParams.get('statusOfOrders') || '';
  const initialPage = searchParams.get('page') || '';

  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [statusOfOrders, setStatusOfOrders] = useState(initialStatusOfOrder);
  const [pageOrders, setPageOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(initialPage || FIRST_PAGE_NUMBER);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(limit));
    params.set('search', String(search));
    params.set('statusOfOrders', String(statusOfOrders));
    params.set('page', String(page));
    setSearchParams(params);
  }, [limit, search, statusOfOrders, page, setSearchParams]);
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
        statusOfOrders,
        setStatusOfOrders,
        search,
        setSearch,
        limit,
        setLimit,
      }}>
      {children}
    </OrdersContext.Provider>
  );
};
export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrderContext must be used with OrderProvider.');
  }
  return context;
};
