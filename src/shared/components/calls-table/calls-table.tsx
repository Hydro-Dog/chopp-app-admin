import { Pagination } from '@shared/types';
import { truncateText } from '@shared/utils';
import { CallsTableRecord } from '@store/index';
import { Card, Input, Table, TablePaginationConfig, Tooltip } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useDebounceCallback } from 'usehooks-ts';

type Props = {
  data?: CallsTableRecord[];
  pagination: Pagination;
  handleSearch: (value: string) => void;
  handleTableChange?: (
    pagination?: TablePaginationConfig,
    filters?: Record<string, FilterValue | null>,
    sorter?: SorterResult<AnyObject> | SorterResult<AnyObject>[],
    extra?: TableCurrentDataSource<AnyObject>,
  ) => void;
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
  const debounced = useDebounceCallback(({ target: { value } }) => {
    handleSearch(value);
  }, 1500);
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
    <Card title={title}>
      <Input.Search
        // TODO: перевод
        placeholder="Поиск"
        onChange={debounced}
        allowClear
        className="mb-2"
      />
      <Table
        size={size}
        columns={callsHistoryColumns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
    </Card>
  );
};
