import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallsTable, TitlePage } from '@shared/components';
import { useFilterWsMessages } from '@shared/hooks';
import {
  ErrorResponse,
  Order,
  Pagination,
  PaginationQuery,
  PaginationResponse,
  Sorter,
} from '@shared/types';
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
import { Table, TablePaginationConfig, TableProps, Typography } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useWindowSize } from 'usehooks-ts';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useGetColumns } from '@shared/components/calls-table/hooks';

import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { ORDER_COLORS, ORDER_STATUS } from '@shared/enum';
import { TableSearchParams } from '@shared/types/table-search-params';
import { getChangeStatusDropdownItems, toScreamingSnakeCase, truncateText } from '@shared/utils';
import { Tooltip, Dropdown, Tag } from 'antd';
import dayjs from 'dayjs';
import { ChangeStatusType } from './types';

type FetchDataFunction = (
  params: PaginationQuery,
) => AsyncThunkAction<PaginationResponse<Order>, PaginationQuery, { rejectValue: ErrorResponse }>;

type Props = {
  fetchData: FetchDataFunction;
  data?: PaginationResponse<Order>
};

export const OrdersTable = ({ fetchData, data }: Props) => {
  // const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  // const [search, setSearch] = useState('');
  // const { orders } = useSelector((state: RootState) => state.orders);
  // const { height = 0 } = useWindowSize();
  // const [pagination, setPagination] = useState<Partial<Pagination>>({
  //   current: 1,
  //   pageSize: calcTableRowsNumberByScreenHeight(height - 250),
  // });
  // const [sorter, setSorter] = useState<Sorter>({ field: 'date', order: 'descend' });
  // const [filter, setFilter] = useState('all');
  // const [refreshDisabled, setRefreshDisabled] = useState(true);

  // const { lastMessage: newActivityMessage, messages } = useFilterWsMessages<CallsTableRecord>(
  //   WS_MESSAGE_TYPE.NEW_ORDER,
  // );
  // const [totalActivityMessageCounter, setTotalActivityMessageCounter] = useState(messages.length);

  // // const fetchData = ({ search, page, limit, sort, order, userId, filter }: CallsTableParams) => {
  // //   dispatch(
  // //     fetchOrders({
  // //       search,
  // //       page,
  // //       limit,
  // //       sort,
  // //       order,
  // //       filter,
  // //       userId,
  // //     }),
  // //   );
  // // };

  useEffect(() => {
    dispatch(fetchData({}));
    // fetchData({
    //   search: search,
    //   page: pagination.current,
    //   limit: pagination.pageSize,
    //   sort: sorter.field,
    //   filter,
    //   order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
    // });
  }, [dispatch]);

  // useEffect(() => {
  //   if (messages.length > totalActivityMessageCounter) {
  //     setRefreshDisabled(false);
  //     setTotalActivityMessageCounter(messages.length);
  //   }
  // }, [newActivityMessage]);

  // useEffect(() => {
  //   if (orders?.totalPages) {
  //     setPagination((prev) => ({ ...prev, total: orders?.totalPages * 10 }));
  //   }
  // }, [orders?.totalPages]);

  // const onSearch = (value: string) => {
  //   setSearch(value);
  //   fetchData({
  //     search: value,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.column?.dataIndex,
  //     order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
  //     filter,
  //   });
  // };

  // const onTableChange = (
  //   pagination: TablePaginationConfig,
  //   _filters: Record<string, FilterValue | null>,
  //   sorter: Sorter,
  // ) => {
  //   setPagination(pagination);
  //   setSorter(sorter);
  //   fetchData({
  //     search: search,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.column?.dataIndex,
  //     order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
  //     filter,
  //   });
  // };

  // const onFilterChange = (value: string) => {
  //   setFilter(value);
  //   fetchData({
  //     search: search,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.column?.dataIndex,
  //     order: !sorter.order ? undefined : sorter.order === 'ascend' ? 'asc' : 'desc',
  //     filter: value,
  //   });
  // };

  // const onReset = () => {
  //   setPagination({ current: 1, pageSize: calcTableRowsNumberByScreenHeight(height - 150) });
  //   setSorter({ field: 'date', order: 'descend' });
  //   setFilter('all');
  //   setSearch('');
  //   fetchData({
  //     search: '',
  //     page: 1,
  //     limit: calcTableRowsNumberByScreenHeight(height - 150),
  //     sort: 'date',
  //     order: 'desc',
  //     filter: 'all',
  //   });
  // };

  // const onRefresh = () => {
  //   setRefreshDisabled(true);
  //   fetchData({
  //     search: search,
  //     page: pagination.current,
  //     limit: pagination.pageSize,
  //     sort: sorter?.field,
  //     order: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : undefined,
  //     filter: filter,
  //   });
  // };

  const { t } = useTranslation();

  const columns = [
    {
      title: t('DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      // sortOrder: searchParams?.sorter.field === 'date' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      render: (text: string, record: CallsTableRecord, index: number) => (
        <div
        // onClick={() => onRowClick(record, index)}
        >
          {dayjs(text).format('DD.MM.YYYY HH:mm')}
        </div>
      ),
    },
    {
      title: t('orderStatus'),
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      sorter: true,
      // sortOrder: searchParams?.sorter.field === 'status' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      // onClick: onRowClick,
      render: (text: string, record: CallsTableRecord, index: number) => (
        <Tooltip title={text}>
          <Tag
            // color={ORDER_COLORS[text]}
            // onClick={() => onRowClick(record, index)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {text}
            {/* {t(`ORDER_STATUS.${toScreamingSnakeCase(text)}`)} */}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: t('paymentStatus'),
      dataIndex: 'paymentStatus',
      key: 'orderStatus',
      sorter: true,
      // sortOrder: searchParams?.sorter.field === 'status' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      // onClick: onRowClick,
      render: (text: string, record: CallsTableRecord, index: number) => (
        <Tooltip title={text}>
          <Tag
            // color={ORDER_COLORS[text]}
            // onClick={() => onRowClick(record, index)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {text}
            {/* {t(`ORDER_STATUS.${toScreamingSnakeCase(text)}`)} */}
          </Tag>
        </Tooltip>
      ),
    },

    // {
    //   title: t('ADDRESS'),
    //   dataIndex: 'address',
    //   key: 'address',
    //   // sortOrder: searchParams?.sorter.field === 'address' ? searchParams?.sorter.order : null,
    //   className: 'cursor-pointer',
    //   sorter: true,
    //   // onClick: onRowClick,
    //   render: (text: string, record: CallsTableRecord, index: number) => (
    //     <Tooltip title={text}>
    //       <div
    //         // onClick={() => onRowClick(record, index)}
    //         style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
    //         {text}
    //       </div>
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: t('COMMENT'),
    //   dataIndex: 'comment',
    //   key: 'comment',
    //   sorter: true,
    //   // sortOrder: searchParams?.sorter.field === 'comment' ? searchParams?.sorter.order : null,
    //   className: 'cursor-pointer',
    //   // onClick: onRowClick,
    //   render: (text: string, record: CallsTableRecord, index: number) => (
    //     <Tooltip title={text}>
    //       {/* <div onClick={() => onRowClick(record, index)}>{truncateText(text, 40)}</div> */}
    //     </Tooltip>
    //   ),
    // },
    // {
    //   title: t('USER'),
    //   dataIndex: 'userFullName',
    //   key: 'userFullName',
    //   sorter: true,
    //   // sortOrder: searchParams?.sorter.field === 'userFullName' ? searchParams?.sorter.order : null,
    //   className: 'cursor-pointer',
    //   // onClick: onUserClick,
    //   render: (text: string, record: CallsTableRecord & { userId: string }) => (
    //     <a onClick={() => onUserClick(record)}>{text}</a>
    //   ),
    // },
    // {
    //   title: t('ACTION'),
    //   key: 'action',
    //   render: (text: string, record: CallsTableRecord) => (
    //     <Dropdown
    //       trigger={['click']}
    //       menu={{
    //         items: getChangeStatusDropdownItems(record.status).map((item) => ({
    //           ...item,
    //           label: (
    //             <Tag
    //               color={ORDER_COLORS[item.key]}
    //               style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
    //               {t(`ORDER_STATUS.${toScreamingSnakeCase(item.key)}`)}
    //             </Tag>
    //           ),
    //         })),
    //         // onClick: (value) => {
    //         //   setChangeStatusModalData({ item: record, newStatus: value.key as ORDER_STATUS });
    //         //   openChangeStatusModal();
    //         // },
    //       }}>
    //       <a>
    //         {t('CHANGE_STATUS')}
    //         <DownOutlined />
    //       </a>
    //     </Dropdown>
    //   ),
    // },
  ];

  return (
      <Table
        className="!p-0"
        size="small"
        columns={columns}
        dataSource={data?.items}
        // pagination={searchParams?.pagination}
        // onChange={onTableChange}
        // rowClassName={(_record, index) => {
        //   return index === activeRowIndex
        //     ? theme === 'dark'
        //       ? 'bg-neutral-800'
        //       : 'bg-neutral-100'
        //     : '';
        // }}
        rowKey="id"
      />
      // <CallsTable
      //   data={orders?.items}
      //   searchParams={{ pagination, sorter, search, filter }}
      //   onSearch={onSearch}
      //   onFilterChange={onFilterChange}
      //   onTableChange={onTableChange as TableProps<any>['onChange']}
      //   onReset={onReset}
      //   onRefresh={onRefresh}
      //   refreshDisabled={refreshDisabled}
      // /> 
  );
};
