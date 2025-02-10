import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSearchParamValue } from '@shared/hooks';
import { fetchProducts } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { VerticalLayout } from '../vertical-layout';
import { ProductsLayoutHeader } from './components/';
import { ProductsLayoutMain } from './components/products-layout-main';

const LIMIT = 2;
const FIRST_PAGE_NUMBER = 1;

export const Main = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const { search, setPagination, setPageProducts } = useProductsContext();
  const categoryId = useSearchParamValue('id') || '';
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(fetchProducts({ categoryId, page: FIRST_PAGE_NUMBER, limit: LIMIT, search }));
      setPagination({
        page: FIRST_PAGE_NUMBER,
        limit: LIMIT,
      });
    }
  }, [categoryId, dispatch, search]);

  useEffect(() => {
    setPageProducts(products?.items || []);
  }, [products]);

  return <VerticalLayout header={<ProductsLayoutHeader />} main={<ProductsLayoutMain />} />;
};
