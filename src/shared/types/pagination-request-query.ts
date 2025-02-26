//Синхронизировано с бэком! Менять только во всех местах однвоременно
export type PaginationRequestQuery = {
  page: number;
  limit?: number;
  search?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
  order?: 'ASC' | 'DESC';
};
