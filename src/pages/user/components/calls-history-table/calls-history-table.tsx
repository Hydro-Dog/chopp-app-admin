import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CallsTable } from '@shared/components';
import { Pagination, Sorter } from '@shared/types';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils/calc-table-rows-number-by-screen-height';
import { AppDispatch, CallsTableRecord, fetchCallHistory, RootState } from '@store/index'; // Update the path as necessary
import { TableProps } from 'antd';
import { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import { useWindowSize } from 'usehooks-ts';

export const CallsHistoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { callHistory } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 320),
  });
  const [sorter, setSorter] = useState<Sorter>({ field: 'date', order: 'ascend' });
  const [filter, setFilter] = useState('all');
  const { id } = useParams();

  const fetchData = ({ search, page, limit, sort, order, userId }) => {
    dispatch(
      fetchCallHistory({
        search,
        page,
        limit,
        sort,
        order,
        userId,
      }),
    )};

  useEffect(() => {
    if (id) {
      fetchData({
        search: searchTerm,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
        userId: id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (callHistory?.totalRecords) {
      setPagination((prev) => ({ ...prev, total: callHistory?.totalRecords }));
    }
  }, [callHistory?.totalRecords]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchData({
      search: value,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : (sorter.order === 'ascend' ? 'asc' : 'desc'),
      userId: id,
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: Sorter,
  ) => {
    console.log('sorter: ', sorter)
    setPagination(pagination);
    setSorter(sorter);
    fetchData({
      search: searchTerm,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : (sorter.order === 'ascend' ? 'asc' : 'desc'),
      userId: id,
    });
  };

  const handleFilterChange = (value: string) => {
    setFilter(value)
    fetchData({
      search: searchTerm,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter: value,
    });
  };

  //TODO: При стирании поля поиска на calls history выстреливает несколько fetch запросов
  return (
    <CallsTable
      title={'Calls History'}
      data={callHistory?.items}
      searchParams={{ pagination, sorter, search: searchTerm, userId: id, filter }}
      handleSearch={handleSearch}
      handleFilterChange={handleFilterChange}
      handleTableChange={handleTableChange as TableProps<CallsTableRecord>['onChange']}
      columns={['date', 'status', 'address', 'comment', 'action']}
    />
  );
};
