import { ORDER_STATUS } from '@shared/enum';

//Синхронизировано с бэком! Менять только во всех местах однвоременно
export type PaginationRequestQuery = {
  page: number;
  limit?: number;
  search?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
  status?: string[];
  order?: 'ASC' | 'DESC';
};
