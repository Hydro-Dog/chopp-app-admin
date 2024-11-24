import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { ACTIVITY_COLORS, ACTIVITY_STATUS } from '@shared/enum';
import { TableSearchParams } from '@shared/types/table-search-params';
import { getChangeStatusDropdownItems, toScreamingSnakeCase, truncateText } from '@shared/utils';
import { CallsTableRecord } from '@store/slices';
import { Tooltip, Dropdown, Tag } from 'antd';
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
  const { t } = useTranslation();

  return [
    {
      title: t('DATE'),
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
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'status' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      onClick: onRowClick,
      render: (text: string, record: CallsTableRecord, index: number) => (
        <Tooltip title={text}>
          <Tag
            color={ACTIVITY_COLORS[text]}
            onClick={() => onRowClick(record, index)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(text)}`)}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: t('ADDRESS'),
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
      title: t('COMMENT'),
      dataIndex: 'comment',
      key: 'comment',
      sorter: true,
      sortOrder: searchParams?.sorter.field === 'comment' ? searchParams?.sorter.order : null,
      className: 'cursor-pointer',
      onClick: onRowClick,
      render: (text: string, record: CallsTableRecord, index: number) => (
        <Tooltip title={text}>
          <div onClick={() => onRowClick(record, index)}>{truncateText(text, 40)}</div>
        </Tooltip>
      ),
    },
    {
      title: t('USER'),
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
      title: t('ACTION'),
      key: 'action',
      render: (text: string, record: CallsTableRecord) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: getChangeStatusDropdownItems(record.status).map((item) => ({
              ...item,
              label: (
                <Tag
                  color={ACTIVITY_COLORS[item.key]}
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(item.key)}`)}
                </Tag>
              ),
            })),
            onClick: (value) => {
              setChangeStatusModalData({ item: record, newStatus: value.key as ACTIVITY_STATUS });
              openChangeStatusModal();
            },
          }}>
          <a>
            {t('CHANGE_STATUS')}
            <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];
};
