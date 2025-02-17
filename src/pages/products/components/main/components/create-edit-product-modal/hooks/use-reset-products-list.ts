import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';

const LIMIT = 2;
const FIRST_PAGE_NUMBER = 1;

export const useResetProductList = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const { search, setPagination, setPageProducts, setSearch } = useProductsContext();
  const categoryId = useSearchParamValue('id') || '';
  const dispatch = useDispatch<AppDispatch>();

  const resetProductList = () => {
    dispatch(fetchProducts({ categoryId, page: FIRST_PAGE_NUMBER, limit: LIMIT, search }));
    setPagination({
      page: FIRST_PAGE_NUMBER,
      limit: LIMIT,
    });
    setSearch('');
  };

  //   useEffect(() => {
  //     setPageProducts(products?.items || []);
  //   }, [products]);

  return { resetProductList };
};
