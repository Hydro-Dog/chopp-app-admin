import { useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { FETCH_STATUS, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Pagination, PaginationProps } from 'antd';
import { ProductsGrid } from '../products-grid';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

export const ProductsLayoutMain = () => {
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const {
    search,
    pageProducts,
    totalPages,
    totalItems,
    limit,
    categoryId,
    page,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

  const onPaginationChange = (page: number, size: number) => {
    superDispatch({
      action: fetchProducts({
        categoryId,
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

  return (
    products?.totalPages !== undefined && (
      <div className="p-3">
        <ProductsGrid items={pageProducts} loading={fetchProductsStatus === FETCH_STATUS.LOADING} />
        totalPages: {totalPages} - {page}
        <Pagination
          size="small"
          current={page}
          // TODO: установить нормальные занчения в pageSizeOptions
          pageSizeOptions={[2, 8, 12]}
          pageSize={limit}
          total={totalItems}
          showTotal={showTotal}
          onChange={onPaginationChange}
          showSizeChanger
          showQuickJumper
        />
      </div>
    )
  );
};
