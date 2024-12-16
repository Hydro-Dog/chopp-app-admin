export type SearchRequestParams = {
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  filter?: string;
};
