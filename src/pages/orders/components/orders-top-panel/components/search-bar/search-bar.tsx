import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { useRefetchTableOrders } from '@pages/orders/hooks';
import { Input } from 'antd';
import { useDebounceCallback } from 'usehooks-ts';
const { Search } = Input;

export const SearchBar = () => {
  const { setSearch, search } = useOrdersContext();
  const filters = useRefetchTableOrders();
  const { t } = useTranslation();

  const debounce = useDebounceCallback((value) => {
    setSearch(value);
    filters({ searchParam: value });
  }, 500);

  return (
    <Search
      defaultValue={search}
      onChange={(e) => debounce(e.target.value)}
      placeholder={t('ORDERS_PAGE.ENTER_ID')}
    />
  );
};
