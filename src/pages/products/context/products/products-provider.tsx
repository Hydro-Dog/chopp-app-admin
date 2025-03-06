import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCT_STATE, Product, PropsWithChildrenOnly } from '@shared/index';

export const LIMIT = 2;

type ProductsContextType = {
  pageProducts: Product[];
  setPageProducts: Dispatch<SetStateAction<Product[]>>;
  categoryId: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalItems: number;
  setTotalItems: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  productsState: PRODUCT_STATE | PRODUCT_STATE[];
  setProductsState: Dispatch<SetStateAction<PRODUCT_STATE | PRODUCT_STATE[]>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLimit = Number(searchParams.get('limit')) || LIMIT;
  const initialSearch = searchParams.get('search') || '';
  const initialCategoryId = searchParams.get('categoryId') || '';
  const initialPage = searchParams.get('page') || '';
  const initialProductsState = [PRODUCT_STATE.DEFAULT, PRODUCT_STATE.HIDDEN];

  const [pageProducts, setPageProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [productsState, setProductsState] = useState(initialProductsState);
  const [page, setPage] = useState(initialPage || 1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', String(limit));
    params.set('search', String(search));
    params.set('categoryId', String(categoryId));
    params.set('page', String(page));
    setSearchParams(params);
  }, [limit, search, categoryId, page, setSearchParams]);

  return (
    <ProductsContext.Provider
      value={{
        pageProducts,
        setPageProducts,
        categoryId,
        setCategoryId,
        page,
        setPage,
        productsState,
        setProductsState,
        limit,
        setLimit,
        totalPages,
        setTotalPages,
        totalItems,
        setTotalItems,
        search,
        setSearch,
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
