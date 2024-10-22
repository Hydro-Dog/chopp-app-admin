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
  const { id } = useParams();

  console.log('pagination: ', pagination)

  useEffect(() => {
    if (id) {
      dispatch(
        fetchCallHistory({
          search: searchTerm,
          page: pagination.current,
          limit: pagination.pageSize,
          sort: sorter.field,
          order: sorter.order === 'ascend' ? 'asc' : 'desc',
          userId: id,
        }),
      );
    }
  }, [searchTerm, pagination, sorter, dispatch, id]);

  useEffect(() => {
    if (callHistory?.totalRecords) {
      setPagination((prev) => ({ ...prev, total: callHistory?.totalRecords }));
    }
  }, [callHistory?.totalRecords]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: Sorter,
  ) => {
    setPagination(pagination);
    setSorter(sorter);
  };

  console.log('callHistory: ', callHistory)

  return (
    <CallsTable
      title={'Calls History'}
      data={callHistory?.items}
      pagination={pagination}
      handleSearch={handleSearch}
      handleTableChange={handleTableChange as TableProps<CallsTableRecord>['onChange']}
    />
  );
};
