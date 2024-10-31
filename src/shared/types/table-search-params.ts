import { Pagination } from './pagination';
import { Sorter } from './sorter';

export type TableSearchParams = {
  pagination: Partial<Pagination>;
  sorter: Sorter;
  search: string;
  userId?: string;
  filter: string;
};
