import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/enum';
import { Sorter, TitlePage, FETCH_STATUS } from '@shared/index';
import { Pagination } from '@shared/types';
import { calcTableRowsNumberByScreenHeight } from '@shared/utils/calc-table-rows-number-by-screen-height';
import { AppDispatch, fetchUsers, RootState, User } from '@store/index';
import { Table, Input, Card, TablePaginationConfig, TableProps } from 'antd';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { useDebounceCallback, useWindowSize } from 'usehooks-ts';

export const UsersPage = () => {
  // const { t } = useTranslation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const { users, fetchUsersStatus, currentUser } = useSelector((state: RootState) => state.user);

  // const [searchTerm, setSearchTerm] = useState('');
  // const { height = 0 } = useWindowSize();
  // const [pagination, setPagination] = useState<Partial<Pagination>>({
  //   current: 1,
  //   pageSize: calcTableRowsNumberByScreenHeight(height - 150),
  // });

  // const [sorter, setSorter] = useState<Sorter>({ field: 'date', order: 'ascend' });

  // const fetchData = ({ search, page, limit, sort, order }) => {
  //   console.log('fetchData order: ', order);
  //   dispatch(
  //     fetchUsers({
  //       search,
  //       page,
  //       limit,
  //       sort,
  //       order,
  //       excludeRequesterId: currentUser?.id,
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   fetchData({
  //     search: searchTerm,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter.field,
  //     order: sorter.order === 'ascend' ? 'asc' : 'desc',
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (users?.totalRecords) {
  //     setPagination((prev) => ({ ...prev, total: users?.totalRecords }));
  //   }
  // }, [users?.totalPages, users?.totalRecords]);

  // const onSearch = (value: string) => {
  //   setSearchTerm(value);
  //   fetchData({
  //     search: value,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.column?.dataIndex,
  //     order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
  //   });
  // };

  // const onTableChange = (
  //   pagination: TablePaginationConfig,
  //   _filters: Record<string, FilterValue | null>,
  //   sorter: Sorter,
  // ) => {
  //   console.log('sorter: ', sorter);
  //   setPagination(pagination);
  //   setSorter(sorter);
  //   fetchData({
  //     search: searchTerm,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.column?.dataIndex,
  //     order: !sorter.order ? sorter.order : sorter.order === 'ascend' ? 'asc' : 'desc',
  //   });
  // };

  // const handleRowClick = (record: User) => {
  //   navigate(`${ROUTES.USERS}/${record.id}`);
  // };

  // const columns: ColumnsType<User> = [
  //   {
  //     title: t('FULL_NAME'),
  //     dataIndex: 'fullName',
  //     key: 'fullName',
  //     sorter: true,
  //     sortOrder: sorter.field === 'fullName' ? sorter.order : null,
  //     className: 'cursor-pointer',
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: t('EMAIL'),
  //     dataIndex: 'email',
  //     key: 'email',
  //     sorter: true,
  //     sortOrder: sorter.field === 'email' ? sorter.order : null,
  //     className: 'cursor-pointer',
  //   },
  //   {
  //     title: t('PHONE_NUMBER'),
  //     dataIndex: 'phoneNumber',
  //     key: 'phoneNumber',
  //     sorter: true,
  //     sortOrder: sorter.field === 'phoneNumber' ? sorter.order : null,
  //     className: 'cursor-pointer',
  //   },
  // ];

  // const debounced = useDebounceCallback(({ target: { value } }) => {
  //   onSearch(value);
  // }, 300);

  // return (
  //   <TitlePage title={t('USERS')}>
  //     {/* TODO: вынести структуру card + search + table в shared таблицу */}
  //     <Card size="small">
  //       <Input.Search placeholder={t('SEARCH')} onChange={debounced} allowClear className="mb-2" />
  //       <Table
  //         size="small"
  //         columns={columns}
  //         dataSource={users?.items}
  //         loading={fetchUsersStatus === FETCH_STATUS.LOADING}
  //         onChange={onTableChange as TableProps<User>['onChange']}
  //         pagination={pagination}
  //         rowKey="email"
  //         onRow={(record) => ({
  //           onClick: () => handleRowClick(record),
  //         })}
  //       />
  //     </Card>
  //   </TitlePage>
  // );
};
