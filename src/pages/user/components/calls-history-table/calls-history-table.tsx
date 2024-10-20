import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCallHistory, RootState } from '@store/index'; // Update the path as necessary
import { Table, Input, Card, Tooltip } from 'antd'; // Import Tooltip from antd
import { Pagination } from '@shared/types';
import { CallsTable } from '@shared/index';

export const CallsHistoryTable = () => {
  const dispatch = useDispatch();
  const { callHistory } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState({ field: 'date', order: 'ascend' });
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      fetchCallHistory({
        search: searchTerm,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.field,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
        userId: id,
      }),
    );
  }, [searchTerm, pagination, sorter, dispatch, id]);

  useEffect(() => {
    if (callHistory?.totalPages) {
      setPagination((prev) => ({ ...prev, total: callHistory?.totalPages * 10 }));
    }
  }, [callHistory?.totalPages]);

  const handleSearch = (value: string) => {
    console.log(';handleSearch: ', value)
    setSearchTerm(value);
  };

  const handleTableChange = (newPagination: Pagination, newSorter) => {
    setPagination(newPagination);
    setSorter(newSorter);
  };

  return (
    <CallsTable
      title={'Calls History'}
      data={callHistory?.items}
      pagination={pagination}
      handleSearch={handleSearch}
      handleTableChange={handleTableChange}
    />
  );
  // return (
  //   <Card title="Calls History">
  //     <Input.Search
  //       placeholder="Search call history"
  //       onSearch={handleSearch}
  //       style={{ marginBottom: 16 }}
  //     />
  //     <Table
  //       size="small"
  //       columns={callsHistoryColumns}
  //       dataSource={callHistory?.items}
  //       pagination={pagination}
  //       onChange={handleTableChange}
  //       rowKey="id"
  //     />
  //   </Card>
  // );
};
