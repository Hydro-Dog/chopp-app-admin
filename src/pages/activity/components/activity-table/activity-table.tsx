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
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      // TODO: сделать экшн для получения активности, в объекте активности джоинить юзера, который сделал вызов
      fetchCallHistory({
        search: searchTerm,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        userId: id,
      }),
    );
  }, [searchTerm, pagination, sorter, dispatch, id]);

  useEffect(() => {
    if (callHistory?.totalPages) {
      setPagination((prev) => ({ ...prev, total: callHistory?.totalPages * 10 }));
    }
  }, [callHistory?.totalPages]);

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

  return (
    <>
      <Title level={2}>{t('Activity')}</Title>
      <CallsTable
        data={callHistory?.items}
        searchParams={{ pagination, sorter, search: searchTerm, userId: id }}
        handleSearch={handleSearch}
        handleTableChange={handleTableChange}
      />
    </>
  );
};
