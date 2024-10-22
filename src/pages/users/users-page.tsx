import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/enum';
import { Sorter } from '@shared/index';
import { Pagination } from '@shared/types';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils/calc-table-rows-number-by-screen-height';
import { AppDispatch, FETCH_STATUS, fetchUsers, RootState, User } from '@store/index';
import { Table, Input, Typography, Card, TablePaginationConfig, TableProps } from 'antd';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { useDebounceCallback, useWindowSize } from 'usehooks-ts';

const { Title } = Typography;

export const UsersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, fetchUsersStatus } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const { height = 0 } = useWindowSize();
  const [pagination, setPagination] = useState<Partial<Pagination>>({
    current: 1,
    pageSize: calcTableRowsNumberByScreenHeight(height - 150),
  });

  const [sorter, setSorter] = useState<Sorter>({ field: 'fullName', order: 'ascend' });

  useEffect(() => {
    dispatch(
      fetchUsers({
        search: searchTerm,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
      }),
    );
  }, [searchTerm, pagination, sorter, dispatch]);

  useEffect(() => {
    if (users?.totalRecords) {
      setPagination((prev) => ({ ...prev, total: users?.totalRecords }));
    }
  }, [users?.totalPages, users?.totalRecords]);

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

  const handleRowClick = (record: User) => {
    navigate(`${ROUTES.USERS}/${record.id}`);
  };

  const columns: ColumnsType<User> = [
    {
      // TODO: Перевод
      title: t('Name'),
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: true,
      className: 'cursor-pointer',
      sortOrder: sorter.field === 'fullName' ? sorter.order : null,
      render: (text) => <a>{text}</a>,
    },
    {
      // TODO: Перевод
      title: t('Email'),
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      className: 'cursor-pointer',
      sortOrder: sorter.field === 'email' ? sorter.order : null,
    },
    {
      // TODO: Перевод
      title: t('Phone Number'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: true,
      className: 'cursor-pointer',
      sortOrder: sorter.field === 'phoneNumber' ? sorter.order : null,
    },
  ];

  const debounced = useDebounceCallback(({ target: { value } }) => {
    handleSearch(value);
  }, 300);

  return (
    <div>
      {/* TODO: Перевод */}
      <Title level={2}>{t('Users')}</Title>
      {/* TODO: вынести структуру card + search + table в shared таблицу */}
      <Card size="small">
        <Input.Search
          // TODO: перевод
          placeholder="Поиск"
          onChange={debounced}
          allowClear
          className="mb-2"
        />
        <Table
          size="small"
          columns={columns}
          dataSource={users?.items}
          loading={fetchUsersStatus === FETCH_STATUS.LOADING}
          onChange={handleTableChange as TableProps<User>['onChange']}
          pagination={pagination}
          rowKey="email"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Card>
    </div>
  );
};
