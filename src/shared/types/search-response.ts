export type SearchResponse<T> = {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
};
