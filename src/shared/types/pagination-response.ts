//Синхронизировано с бэком! Менять только во всех местах однвоременно
export type PaginationResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  limit: number;
};

export type YookassaPaginationResponse<T> = {
  items: T[];
  next_cursor?: string;
  type: 'list';
};
