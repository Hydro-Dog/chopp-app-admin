import { SortOrder } from 'antd/es/table/interface';

export type Sorter = {
  field: string;
  order: SortOrder;
  column?: { dataIndex: string };
};
