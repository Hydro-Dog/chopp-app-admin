import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { useChangeTableOrders } from '@pages/orders/hooks';
import { Input } from 'antd';
const { Search } = Input;

export const SearchBar = () => {
  const { search, setSearch } = useOrdersContext();
  const filters = useChangeTableOrders();

  const { t } = useTranslation();

  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    filters({ searchParam: event.target.value });
  };

  return <Search value={search} onChange={changeSearch} placeholder={t('ORDERS_PAGE.ENTER_ID')} />;
};
