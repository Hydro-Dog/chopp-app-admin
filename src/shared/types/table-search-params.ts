import { Pagination } from './pagination';

export type TableSearchParams = {
  pagination: Partial<Pagination>;
  sorter: { field: string; order: 'ascend' | 'descend' };
  search: string;
  userId: string;
  filter: string;
};
