import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { CALL_STATUS, ConfirmModal, ROUTES, useTheme } from '@shared/index';
import { Pagination } from '@shared/types';
import { getChangeStatusDropdownItems, statusMenuItems, truncateText } from '@shared/utils';
import { AppDispatch, CallsTableRecord, fetchCallHistory, updateCallStatus } from '@store/index';
import {
  Button,
  Card,
  Dropdown,
  Input,
  MenuProps,
  Space,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';
import { useBoolean, useDebounceCallback } from 'usehooks-ts';
import { DraggableModal } from '../draggable-modal';

const { Text } = Typography;

const menuItems: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items: menuItems,
  onClick: console.log,
};

type Props = {
  data?: CallsTableRecord[];
  searchParams?: {
    pagination: Partial<Pagination>;
    sorter: { field: string; order: 'ascend' | 'descend' };
    search: string;
    userId: string;
    filter: string;
  };
  handleSearch: (value: string) => void;
  handleTableChange?: TableProps<any>['onChange'];
  title: string;
  size?: SizeType;
  columns?: string[];
};

export const CallsTable = ({
  data,
  handleSearch,
  handleTableChange,
  handleFilterChange,
  searchParams,
  title,
  size = 'small',
  columns = ['date', 'status', 'address', 'comment', 'userFullName', 'action'],
}: Props) => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeRowIndex, setActiveRowIndex] = useState<number>();
  const {
    value: isDetailsModalOpen,
    setTrue: openDetailsModal,
    setFalse: closeDetailsModal,
  } = useBoolean();
  const [detailsModalData, setDetailsModalData] = useState<CallsTableRecord>();
  const {
    value: isChangeStatusModalOpen,
    setTrue: openChangeStatusModal,
    setFalse: closeChangeStatusModal,
  } = useBoolean();
  const [changeStatusModalData, setChangeStatusModalData] = useState<{
    item: CallsTableRecord;
    newStatus: CALL_STATUS;
  }>();
  const debounced = useDebounceCallback(({ target: { value } }) => {
    handleSearch(value);
  }, 300);

  const onRowClick = (record, index) => {
    setActiveRowIndex(index);
    setDetailsModalData(record);
    openDetailsModal();
  };

  const onUserClick = (record, index) => {
    navigate(`${ROUTES.USERS}/${record.userId}`);
  };

  const DEFAULT_COLUMNS = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'date' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      render: (text: string, record, index) => (
        <div onClick={() => onRowClick(record, index)}>
          {dayjs(text).format('DD.MM.YYYY HH:mm')}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'status' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      onClick: onRowClick,
      render: (text: string, record, index) => (
        <Tooltip title={text}>
          <div
            onClick={() => onRowClick(record, index)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sortOrder: searchParams?.sorter.field === 'address' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      sorter: true,
      onClick: onRowClick,
      render: (text: string, record, index) => (
        <Tooltip title={text}>
          <div
            onClick={() => onRowClick(record, index)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'comment' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      onClick: onRowClick,
      render: (text: string, record, index) => (
        <Tooltip title={text}>
          <div onClick={() => onRowClick(record, index)}>{truncateText(text, 100)}</div>
        </Tooltip>
      ),
    },
    {
      title: 'User',
      dataIndex: 'userFullName',
      key: 'userFullName',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'userFullName' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      onClick: onUserClick,
      render: (text: string, record, index) => <a onClick={() => onUserClick(record)}>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: CallsTableRecord) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: getChangeStatusDropdownItems(record.status),
            onClick: (value) => {
              setChangeStatusModalData({ item: record, newStatus: value.key });
              openChangeStatusModal();
            },
          }}>
          <a>
            Изменить статус <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  const visibleColumns = DEFAULT_COLUMNS.filter((item) => columns.includes(item.key));

  const updateStatus = (id = '', newStatus: CALL_STATUS) => {
    dispatch(updateCallStatus({ id, newStatus })).then(() =>
      dispatch(
        fetchCallHistory({
          userId: searchParams?.userId,
          search: searchParams?.search,
          page: searchParams?.pagination.current,
          limit: searchParams?.pagination.pageSize,
          userId: id,
          sort: searchParams.sorter.field,
          order: searchParams.sorter.order
            ? searchParams.sorter.order === 'ascend'
              ? 'asc'
              : 'desc'
            : undefined,
        }),
      ),
    );
  };

  const getStatusMenuItems = (currentFilter: string) =>
    [{ key: 'all', label: 'all' }, ...statusMenuItems].map((item) =>
      item.key === currentFilter ? { ...item, disabled: true } : item,
    );

  return (
    <div>
      {/* TODO: вынести структуру card + search + table в shared таблицу */}
      <Card size="small" title={title}>
        <div className="flex gap-2 items-center mb-1">
          <Typography>Статус</Typography>
          <Dropdown
            menu={{
              items: getStatusMenuItems(searchParams?.filter),
              onClick: (value) => {
                console.log('value: ', value);
                handleFilterChange(value.key);
              },
            }}>
            <a>
              <Space>
                {
                  getStatusMenuItems(searchParams?.filter).find(
                    (item) => item.key === searchParams?.filter,
                  )?.label
                }
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Input.Search
          // TODO: перевод
          placeholder="Поиск"
          onChange={debounced}
          allowClear
          className="mb-2"
        />
        <Table
          className="!p-0 wowowo"
          size={size}
          columns={visibleColumns}
          dataSource={data}
          pagination={searchParams.pagination}
          onChange={handleTableChange}
          rowClassName={(_record, index) => {
            return index === activeRowIndex
              ? theme === 'dark'
                ? 'bg-neutral-800'
                : 'bg-neutral-100'
              : '';
          }}
          rowKey="id"
        />
      </Card>
      {/* TODO: вынести модалку в отдельный компонент  */}
      <DraggableModal
        // TODO: перевод
        title={`Вызов №: ${detailsModalData?.id}`}
        footer={null}
        open={isDetailsModalOpen}
        onOk={() => {
          closeDetailsModal();
          setDetailsModalData();
          setActiveRowIndex();
        }}
        onCancel={() => {
          closeDetailsModal();
          setDetailsModalData();
          setActiveRowIndex();
        }}>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex gap-1">
              <Text strong>Status: </Text>
              <Dropdown menu={menuProps}>
                <a>
                  <Space>
                    {detailsModalData?.status}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <Button disabled>Изменить статус</Button>
          </div>
          {Object.entries<string>(detailsModalData || {})
            .filter(([key]) => key !== 'id')
            .map(([key, value]) => {
              return (
                <div key={key} className="flex flex-col gap-1">
                  {/* TODO: перевод key */}
                  <Text strong>{key}: </Text>
                  <Text>{value}</Text>
                </div>
              );
            })}
        </div>
      </DraggableModal>
      <ConfirmModal
        title="Изменить статус?"
        open={isChangeStatusModalOpen}
        onOk={() => {
          updateStatus(changeStatusModalData?.item.id, changeStatusModalData?.newStatus);
          closeChangeStatusModal();
          setChangeStatusModalData(null);
        }}
        onCancel={() => {
          closeChangeStatusModal();
          setChangeStatusModalData(null);
        }}>
        Изменить статус заказа {changeStatusModalData?.item.id} с{' '}
        {changeStatusModalData?.item.status} на {changeStatusModalData?.newStatus}
      </ConfirmModal>
    </div>
  );
};
