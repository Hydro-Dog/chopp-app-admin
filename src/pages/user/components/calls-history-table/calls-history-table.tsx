import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CallsTable } from '@shared/components';
import { Pagination, Sorter } from '@shared/types';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils/calc-table-rows-number-by-screen-height';
import {
  AppDispatch,
  CallsTableParams,
  CallsTableRecord,
  fetchCallHistory,
  RootState,
} from '@store/index';
import { TableProps } from 'antd';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useWindowSize } from 'usehooks-ts';

export const CallsHistoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orders);
  const [search, setSearch] = useState('');
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 350),
  });
  const [sorter, setSorter] = useState<Sorter>({ field: 'date', order: 'descend' });
  const [filter, setFilter] = useState('all');
  const { id } = useParams();

  const fetchData = ({ search, page, limit, sort, order, userId }: CallsTableParams) => {
    dispatch(
      fetchCallHistory({
        search,
        page,
        limit,
        sort,
        order,
        userId,
      }),
    );
  };

  useEffect(() => {
    if (id) {
      fetchData({
        search: search,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
        userId: id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (orders?.totalRecords) {
      setPagination((prev) => ({ ...prev, total: orders?.totalRecords }));
    }
  }, [orders?.totalRecords]);

  const onSearch = (value: string) => {
    setSearch(value);
    fetchData({
      search: value,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
      userId: id!,
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
      userId: id!,
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
    setSorter({ field: 'date', order: 'ascend' });
    setFilter('all');
    setSearch('');
    fetchData({
      search: '',
      page: 1,
      limit: calcTableRowsNumberByScreenHeight(height - 150),
      sort: 'date',
      order: 'asc',
      filter: 'all',
    });
  };

  //TODO: При стирании поля поиска на calls history выстреливает несколько fetch запросов
  return (
    <CallsTable
      title={'Calls History'}
      data={orders?.items}
      searchParams={{ pagination, sorter, search, userId: id, filter }}
      onSearch={onSearch}
      onFilterChange={onFilterChange}
      onTableChange={onTableChange as TableProps<CallsTableRecord>['onChange']}
      onReset={onReset}
      columns={['date', 'status', 'address', 'comment', 'action']}
    />
  );
};
