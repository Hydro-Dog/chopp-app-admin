export type PaginationResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

export type YookassaPaginationResponse<T> = {
  items: T[];
  next_cursor?: string;
  type: 'list';
};