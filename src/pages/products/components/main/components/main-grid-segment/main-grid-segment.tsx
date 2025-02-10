import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { FETCH_STATUS, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Button } from 'antd';
import { ProductsGrid } from '../products-grid';
import { ChoppLoadMore } from '@shared/index';

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
        page: pagination.page + 1,
        search,
      }),
      thenHandler: (response) => {
        setPageProducts([...pageProducts, ...(response.items || [])]);
        setPagination({ page: response.pageNumber + 1 });
      },
    });
  };

  return (
    products?.totalPages !== undefined && (
      <div className="p-3">
        <ProductsGrid items={pageProducts} loading={fetchProductsStatus === FETCH_STATUS.LOADING} />

        <ChoppLoadMore
          onLoadMore={onLoadMore}
          totalPages={products.totalPages}
          page={pagination.page}
          className='mt-3'
        />
      </div>
    )
  );
};
