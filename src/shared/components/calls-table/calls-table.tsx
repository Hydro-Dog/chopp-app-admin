import { Pagination } from '@shared/types';
import { CallsTableRecord } from '@store/index';
import { Card, Input, Table, TablePaginationConfig, Tooltip } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

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
};

export const CallsTable = ({ data, pagination, handleSearch, handleTableChange, title }: Props) => {
  const callsHistoryColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: true },
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
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
  ];

  console.log('handleSearch: ', handleSearch);

  return (
    <Card title={title}>
      <Input.Search
        placeholder="Search call history"
        // TODO: добавить поиск по change с дебаунсом, добавить кнопку очистки поля
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        size="small"
        columns={callsHistoryColumns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
    </Card>
  );
};
