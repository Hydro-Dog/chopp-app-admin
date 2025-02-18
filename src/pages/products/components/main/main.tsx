import { useEffect } from 'react';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/index';
import { VerticalLayout } from '../vertical-layout';
import { ProductsLayoutHeader } from './components/';
import { ProductsLayoutMain } from './components/products-layout-main';

export const Main = () => {
  const {
    search,
    page,
    limit,
    categoryId,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

  useEffect(() => {
    if (categoryId !== undefined) {
      console.log('superDispatch---')
      superDispatch({
        action: fetchProducts({
          categoryId,
          page,
          search,
          limit,
        }),
        thenHandler: (response) => {
          setPageProducts(response.items);
          setPage(response.pageNumber);
          setTotalItems(response.totalItems);
          setTotalPages(response.totalPages);
          setLimit(response.limit);
        },
      });
    }
  }, [categoryId]);

  return <VerticalLayout header={<ProductsLayoutHeader />} main={<ProductsLayoutMain />} />;
};
