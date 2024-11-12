/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { ACTIVITY_COLORS, ACTIVITY_STATUS, ROUTES, useTheme } from '@shared/index';
import { TableSearchParams } from '@shared/types/table-search-params';
import { statusMenuItems, toScreamingSnakeCase } from '@shared/utils';
import { AppDispatch, CallsTableRecord, fetchCallHistory, updateCallStatus } from '@store/index';
import { Button, Card, Dropdown, Input, Space, Table, TableProps, Tag, Typography } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useBoolean, useDebounceCallback } from 'usehooks-ts';
import { RecordDetailsModal } from './components';
import { ConfirmChangeStatusModal } from './components/confirm-change-status-modal';
import { useGetColumns } from './hooks';
import { ChangeStatusType } from './types';

export const useFetFilterItems = (status?: ACTIVITY_STATUS) => {
  const { t } = useTranslation();
  return [{ key: 'all', label: 'all' }, ...statusMenuItems].map((item) => ({
    ...item,
    label: (
      <Tag
        color={ACTIVITY_COLORS[item.key]}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(item.key)}`)}
      </Tag>
    ),
    disabled: item.key === status,
  }));
};

type Props = {
  data?: CallsTableRecord[];
  searchParams?: TableSearchParams;
  onSearch: (value: string) => void;
  onTableChange?: TableProps<any>['onChange'];
  onReset: () => void;
  onRefresh?: () => void;
  refreshDisabled: boolean;
  title?: string;
  size?: SizeType;
  columns?: string[];
  onFilterChange: any;
};

export const CallsTable = ({
  data,
  onSearch,
  onTableChange,
  onFilterChange,
  onReset,
  onRefresh,
  refreshDisabled,
  searchParams,
  title,
  size = 'small',
  columns = ['date', 'status', 'address', 'comment', 'userFullName', 'action'],
}: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeRowIndex, setActiveRowIndex] = useState<number>();

  const [detailsModalData, setDetailsModalData] = useState<CallsTableRecord>();
  const [changeStatusModalData, setChangeStatusModalData] = useState<ChangeStatusType>();

  const {
    value: isRecordDetailsModalOpen,
    setTrue: openRecordDetailsModal,
    setFalse: closeRecordDetailsModal,
  } = useBoolean();
  const {
    value: isConfirmStatusModalOpen,
    setTrue: openConfirmStatusModal,
    setFalse: closeConfirmStatusModal,
  } = useBoolean();

  const onRowClick = (record: CallsTableRecord, index: number) => {
    setActiveRowIndex(index);
    setDetailsModalData(record);
    openRecordDetailsModal();
  };

  const onUserClick = (record: CallsTableRecord & { userId: string }) => {
    navigate(`${ROUTES.USERS}/${record.userId}`);
  };

  const defaultColumns = useGetColumns({
    searchParams,
    onRowClick,
    onUserClick,
    setChangeStatusModalData,
    openChangeStatusModal: openConfirmStatusModal,
  });

  const visibleColumns = defaultColumns.filter((item) => columns.includes(item.key));

  const updateStatus = (id = '', newStatus?: ACTIVITY_STATUS) => {
    if (id && newStatus) {
      dispatch(updateCallStatus({ id, newStatus })).then(() =>
        dispatch(
          fetchCallHistory({
            search: searchParams?.search,
            page: searchParams?.pagination.current,
            limit: searchParams?.pagination.pageSize,
            userId: id,
            sort: searchParams?.sorter.field,
            order: searchParams?.sorter.order
              ? searchParams.sorter.order === 'ascend'
                ? 'asc'
                : 'desc'
              : undefined,
          }),
        ),
      );
    }
  };

  // const getStatusMenuItems = (currentFilter?: string) =>
  //   [{ key: 'all', label: 'all' }, ...statusMenuItems].map((item) =>
  //     item.key === currentFilter ? { ...item, disabled: true } : item,
  //   );

  //TODO: вынести в отдельнй хук? логику связанную с полем поиска
  const debounced = useDebounceCallback((value) => {
    if (value) {
      onSearch(value);
    }
  }, 300);

  const [search, setSearch] = useState('');

  useEffect(() => {
    debounced(search);
  }, [search]);

  return (
    <div>
      <Card size="small" title={title}>
        <div className="flex  items-center justify-between mb-2">
          <div className="flex gap-2 items-center">
            <Typography>{t('STATUS')}</Typography>
            <Dropdown
              menu={{
                items: useFetFilterItems(searchParams?.filter),
                onClick: (value) => {
                  onFilterChange(value.key);
                },
              }}>
              <a>
                <Space>
                  <div className="flex items-center">
                    {
                      useFetFilterItems(searchParams?.filter).find(
                        (item) => item.key === searchParams?.filter,
                      )?.label
                    }
                    <DownOutlined />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
          {onRefresh && (
            <Button
              disabled={refreshDisabled}
              onClick={() => {
                onRefresh();
              }}>
              {t('REFRESH')}
            </Button>
          )}
          <Button
            onClick={() => {
              onReset();
              setSearch('');
            }}>
            {t('RESET')}
          </Button>
        </div>
        <Input.Search
          value={search}
          placeholder={t('SEARCH')}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          className="mb-2"
        />
        <Table
          className="!p-0"
          size={size}
          // @ts-ignore
          columns={visibleColumns}
          dataSource={data}
          pagination={searchParams?.pagination}
          onChange={onTableChange}
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
      <RecordDetailsModal
        data={detailsModalData}
        open={isRecordDetailsModalOpen}
        currentStatus={detailsModalData?.status}
        onOk={() => {
          closeRecordDetailsModal();
          setDetailsModalData(undefined);
          setActiveRowIndex(undefined);
        }}
        onCancel={() => {
          closeRecordDetailsModal();
          setDetailsModalData(undefined);
          setActiveRowIndex(undefined);
        }}
        onStatusChange={(newStatus) => {
          setChangeStatusModalData({ item: detailsModalData!, newStatus: newStatus! });
          openConfirmStatusModal();
        }}
      />

      <ConfirmChangeStatusModal
        data={changeStatusModalData}
        open={isConfirmStatusModalOpen}
        onOk={() => {
          updateStatus(changeStatusModalData?.item.id, changeStatusModalData?.newStatus);
          closeConfirmStatusModal();
          setChangeStatusModalData(undefined);
        }}
        onCancel={() => {
          closeConfirmStatusModal();
          setChangeStatusModalData(undefined);
        }}
      />
    </div>
  );
};
