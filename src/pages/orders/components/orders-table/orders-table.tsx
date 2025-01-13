import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CallsTable, TitlePage } from '@shared/components';
import { useFilterWsMessages } from '@shared/hooks';
import { Pagination, Sorter } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils';
import {
  AppDispatch,
  CallsTableParams,
  CallsTableRecord,
  fetchCallHistory,
  fetchOrders,
  RootState,
} from '@store/index'; // Update the path as necessary
import { TablePaginationConfig, TableProps, Typography } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useWindowSize } from 'usehooks-ts';

const { Title } = Typography;

export const OrdersTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const { orders } = useSelector((state: RootState) => state.orders);
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 250),
  });
  const [sorter, setSorter] = useState<Sorter>({ field: 'date', order: 'descend' });
  const [filter, setFilter] = useState('all');
  const [refreshDisabled, setRefreshDisabled] = useState(true);

  const { lastMessage: newActivityMessage, messages } = useFilterWsMessages<CallsTableRecord>(
    WS_MESSAGE_TYPE.NEW_ORDER,
  );
  const [totalActivityMessageCounter, setTotalActivityMessageCounter] = useState(messages.length);

  const fetchData = ({ search, page, limit, sort, order, userId, filter }: CallsTableParams) => {
    dispatch(
      fetchOrders({
        search,
        page,
        limit,
        sort,
        order,
        filter,
        userId,
      }),
    );
  };

  useEffect(() => {
    fetchData({
      search: search,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.field,
      filter,
      order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
    });
  }, [dispatch]);

  useEffect(() => {
    if (messages.length > totalActivityMessageCounter) {
      setRefreshDisabled(false);
      setTotalActivityMessageCounter(messages.length);
    }
  }, [newActivityMessage]);

  useEffect(() => {
    if (orders?.totalPages) {
      setPagination((prev) => ({ ...prev, total: orders?.totalPages * 10 }));
    }
  }, [orders?.totalPages]);

  const onSearch = (value: string) => {
    setSearch(value);
    fetchData({
      search: value,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter,
    });
  };

  const onTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: Sorter,
  ) => {
    setPagination(pagination);
    setSorter(sorter);
    fetchData({
      search: search,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter,
    });
  };

  const onFilterChange = (value: string) => {
    setFilter(value);
    fetchData({
      search: search,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter: value,
    });
  };

  const onReset = () => {
    setPagination({ current: 1, pageSize: calcTableRowsNumberByScreenHeight(height - 150) });
    setSorter({ field: 'date', order: 'descend' });
    setFilter('all');
    setSearch('');
    fetchData({
      search: '',
      page: 1,
      limit: calcTableRowsNumberByScreenHeight(height - 150),
      sort: 'date',
      order: 'desc',
      filter: 'all',
    });
  };

  const onRefresh = () => {
    setRefreshDisabled(true);
    fetchData({
      search: search,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.field,
      order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
      filter: filter,
    });
  };

  return (
    <TitlePage title={t('ORDERS')}>
      <CallsTable
        data={orders?.items}
        searchParams={{ pagination, sorter, search, filter }}
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        onTableChange={onTableChange as TableProps<any>['onChange']}
        onReset={onReset}
        onRefresh={onRefresh}
        refreshDisabled={refreshDisabled}
      />
    </TitlePage>
  );
};
