import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CallsTable } from '@shared/components';
import { Pagination, Sorter } from '@shared/types';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils';
import { AppDispatch, fetchCallHistory, RootState } from '@store/index'; // Update the path as necessary
import { TablePaginationConfig, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';
import { FilterValue } from 'antd/es/table/interface';

const { Title } = Typography;

export const ActivityTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { callHistory } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 150),
  });
  const [sorter, setSorter] = useState({ field: 'date', order: 'ascend' });
  const [filter, setFilter] = useState('all');

  const fetchData = ({ search, page, limit, sort, order, userId, filter }) => {
    dispatch(
      fetchCallHistory({
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
      search: searchTerm,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.field,
      order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
    });
  }, [dispatch]);

  useEffect(() => {
    if (callHistory?.totalPages) {
      setPagination((prev) => ({ ...prev, total: callHistory?.totalPages * 10 }));
    }
  }, [callHistory?.totalPages]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchData({
      search: value,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter,
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: Sorter,
  ) => {
    setPagination(pagination);
    setSorter(sorter);
    fetchData({
      search: searchTerm,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter,
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

  return (
    <>
      <Title level={2}>{t('Activity')}</Title>
      <CallsTable
        data={callHistory?.items}
        searchParams={{ pagination, sorter, search: searchTerm, filter }}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleTableChange={handleTableChange}
      />
    </>
  );
};
