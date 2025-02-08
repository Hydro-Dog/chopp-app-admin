import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { FETCH_STATUS, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Button } from 'antd';
import { ProductsGrid } from '../products-grid';

const LIMIT = 2;

export const MainGridSegment = () => {
  const { t } = useTranslation();
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const { search, pageProducts, pagination, setPagination, setPageProducts } = useProductsContext();
  const categoryId = useSearchParamValue('id') || '';
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

  const onLoadMore = () => {
    superDispatch({
      action: fetchProducts({
        categoryId,
        limit: LIMIT,
        page: pagination.page || 0 + 1,
        search,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({ page: response.currentPage + 1 });
      },
    });
  };

  return (
    products?.totalPages !== undefined && (
      <>
        <ProductsGrid items={pageProducts} loading={fetchProductsStatus === FETCH_STATUS.LOADING} />

        {(pagination?.page || 1) < products?.totalPages && (
          <Button onClick={onLoadMore}>{t('LOAD_MORE')}</Button>
        )}
      </>
    )
  );
};
