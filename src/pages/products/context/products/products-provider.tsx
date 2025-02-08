import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationRequestQuery, Product, PropsWithChildrenOnly } from '@shared/index';

const LIMIT = 2;
const FIRST_PAGE_NUMBER = 1;

type ProductsContextType = {
  pageProducts: Product[];
  setPageProducts: Dispatch<SetStateAction<Product[]>>;
  pagination: PaginationRequestQuery;
  setPagination: Dispatch<SetStateAction<PaginationRequestQuery>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pick<PaginationRequestQuery, 'page' | 'limit'>>({
    page: FIRST_PAGE_NUMBER,
    limit: LIMIT,
  });

  return (
    <ProductsContext.Provider
      value={{
        pageProducts,
        setPageProducts,
        pagination,
        setPagination,
        search,
        setSearch,
        searchParams,
        setSearchParams,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
