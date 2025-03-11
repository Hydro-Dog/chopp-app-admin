import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PRODUCTS_STATE_BY_GRID_MODE } from '@pages/products/constants';
import { useProductsContext } from '@pages/products/context';
import { useShowTotalPagination, useSuperDispatch } from '@shared/hooks';
import { PRODUCT_GRID_VIEW_MODE } from '@shared/index';
import { FETCH_STATUS, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Flex, Pagination, Space } from 'antd';
import { ProductsGrid } from '../products-grid';
import { TrashButton } from './components';

export const ProductsLayoutMain = () => {
  const { t } = useTranslation();
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const {
    search,
    pageProducts,
    totalPages,
    totalItems,
    limit,
    categoryId,
    page,
    productsState,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
    setProductsState,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();
  const showTotal = useShowTotalPagination();

  const onPaginationChange = (page: number, size: number) => {
    superDispatch({
      action: fetchProducts({
        categoryId,
        state: productsState,
        page: size !== limit ? 1 : page,
        search,
        limit: size,
      }),
      thenHandler: (response) => {
        setPageProducts(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  };

  const onTrashClicked = () => {
    setProductsState(PRODUCTS_STATE_BY_GRID_MODE[PRODUCT_GRID_VIEW_MODE.TRASH]);
    superDispatch({
      action: fetchProducts({
        categoryId,
        state: PRODUCTS_STATE_BY_GRID_MODE[PRODUCT_GRID_VIEW_MODE.TRASH],
        page: 1,
        search,
        limit,
      }),
      thenHandler: (response) => {
        setPageProducts(response.items);
        setPage(response.pageNumber);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
        setLimit(response.limit);
      },
    });
  };

  return (
    products?.totalPages !== undefined && (
      <Flex vertical justify="space-between" className="h-full p-3">
        <ProductsGrid items={pageProducts} loading={fetchProductsStatus === FETCH_STATUS.LOADING} />

        <Space>
          <div>
            {t('TOTAL_PAGES')}: {totalPages}
          </div>
          <Pagination
            size="small"
            current={page}
            // TODO: установить нормальные занчения в pageSizeOptions
            pageSizeOptions={[2, 8, 12, 22]}
            pageSize={limit}
            total={totalItems}
            showTotal={showTotal}
            onChange={onPaginationChange}
            showSizeChanger
            showQuickJumper
          />
        </Space>

        <TrashButton />
      </Flex>
    )
  );
};
