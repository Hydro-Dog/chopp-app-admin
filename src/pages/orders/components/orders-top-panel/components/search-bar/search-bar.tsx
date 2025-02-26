import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { useOrdersContext } from '@pages/orders/context';
import { useSuperDispatch } from '@shared/hooks';
import { Order, PaginationRequestQuery, PaginationResponse } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { Input } from 'antd';

export const SearchBar = () => {
  const {
    limit,
    setLimit,
    setPage,
    setPageOrders,
    setTotalItems,
    setTotalPages,
    search,
    setSearch,
  } = useOrdersContext();

  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Order>, PaginationRequestQuery>();

  useEffect(() => {
    superDispatch({
      action: fetchOrders({
        page: 1,
        limit: limit,
        search: search,
      }),
      thenHandler: (response) => {
        setPageOrders(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  }, [search]);

  return (
    <Input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder={t('ORDERS_PAGE.ENTER_ID')}
      prefix={<SearchIcon />}
    />
  );
};
