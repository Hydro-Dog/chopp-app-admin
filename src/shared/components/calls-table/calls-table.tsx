import { useState } from 'react';
import { useTheme } from '@shared/index';
import { Pagination } from '@shared/types';
import { truncateText } from '@shared/utils';
import { CallsTableRecord } from '@store/index';
import { Card, Input, Table, TablePaginationConfig, TableProps, Tooltip, Typography } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useBoolean, useDebounceCallback } from 'usehooks-ts';
import { DraggableModal } from '../draggable-modal';

const { Text } = Typography;

type Props = {
  data?: CallsTableRecord[];
  pagination: Partial<Pagination>;
  handleSearch: (value: string) => void;
  handleTableChange?: TableProps<any>['onChange'];
  title: string;
  size?: SizeType;
};

export const CallsTable = ({
  data,
  pagination,
  handleSearch,
  handleTableChange,
  title,
  size = 'small',
}: Props) => {
  const { theme } = useTheme();
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBoolean();
  const [activeRowIndex, setActiveRowIndex] = useState<number>();
  const [modalData, setModalData] = useState<CallsTableRecord>();
  const debounced = useDebounceCallback(({ target: { value } }) => {
    handleSearch(value);
  }, 300);
  const callsHistoryColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      render: (text) => dayjs(text).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: true,
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
      render: (text) => (
        <Tooltip title={text}>
          <div>{truncateText(text, 100)}</div>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      {/* TODO: вынести структуру card + search + table в shared таблицу */}
      <Card size="small" title={title}>
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
          columns={callsHistoryColumns}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setActiveRowIndex(rowIndex);
                setModalData(record);
                openModal();
              },
            };
          }}
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
      <DraggableModal
        // TODO: перевод
        title={`Вызов №: ${modalData?.id}`}
        open={isModalOpen}
        onOk={() => {
          closeModal();
          setModalData();
          setActiveRowIndex();
        }}
        onCancel={() => {
          closeModal();
          setModalData();
          setActiveRowIndex();
        }}>
        <div className="flex flex-col gap-2">
          {Object.entries<string>(modalData || {})
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
    </div>
  );
};
