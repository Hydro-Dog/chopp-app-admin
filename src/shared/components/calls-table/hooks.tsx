import { Dispatch, SetStateAction } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { CALL_STATUS } from '@shared/enum';
import { TableSearchParams } from '@shared/types/table-search-params';
import { truncateText, getChangeStatusDropdownItems } from '@shared/utils';
import { CallsTableRecord } from '@store/slices';
import { Tooltip, Dropdown } from 'antd';
import dayjs from 'dayjs';
import { ChangeStatusType } from './types';

type Args = {
  searchParams?: TableSearchParams;
  onRowClick: (record: CallsTableRecord, index: number) => void;
  onUserClick: (record: CallsTableRecord & { userId: string }) => void;
  setChangeStatusModalData: Dispatch<SetStateAction<ChangeStatusType | undefined>>;
  openChangeStatusModal: () => void;
};

export const useGetColumns = ({
  searchParams,
  onRowClick,
  onUserClick,
  setChangeStatusModalData,
  openChangeStatusModal,
}: Args) => {
  return [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'date' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      render: (text: string, record: CallsTableRecord, index: number) => (
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
      render: (text: string, record: CallsTableRecord, index: number) => (
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
      render: (text: string, record: CallsTableRecord, index: number) => (
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
      render: (text: string, record: CallsTableRecord, index: number) => (
        <Tooltip title={text}>
          <div onClick={() => onRowClick(record, index)}>{truncateText(text, 50)}</div>
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
      render: (text: string, record: CallsTableRecord & { userId: string }) => (
        <a onClick={() => onUserClick(record)}>{text}</a>
      ),
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
              setChangeStatusModalData({ item: record, newStatus: value.key as CALL_STATUS });
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
};
