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
  const [search, setSearch] = useState('');
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 250),
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
      search: search,
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

  const onSearch = (value: string) => {
    setSearch(value);
    fetchData({
      search: value,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter?.column?.dataIndex,
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
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
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
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
      order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
      filter: value,
    });
  };

  const onReset = () => {
    setPagination({ current: 1, pageSize: calcTableRowsNumberByScreenHeight(height - 150) });
    setSorter({ field: 'date', order: 'ascend' });
    setFilter('all');
    setSearch('')
    fetchData({
      search: '',
      page: 1,
      limit: calcTableRowsNumberByScreenHeight(height - 150),
      sort: 'date',
      order: 'ascend',
      filter: 'all',
    });
  };

  return (
    <>
      <Title level={2}>{t('Activity')}</Title>
      <CallsTable
        data={callHistory?.items}
        searchParams={{ pagination, sorter, search, filter }}
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        onTableChange={onTableChange}
        onReset={onReset}
      />
    </>
  );
};
