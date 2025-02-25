import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { PRODUCTS_STATE_BY_GRID_MODE } from '@pages/products/constants';
import { useProductsContext } from '@pages/products/context';
import {
  PaginationResponse,
  Product,
  PRODUCT_GRID_VIEW_MODE,
  PRODUCT_STATE,
  useSuperDispatch,
} from '@shared/index';
import { fetchProducts } from '@store/slices';
import { FloatButton } from 'antd';
import { t } from 'i18next';

export const TrashButton = () => {
  const {
    search,
    limit,
    categoryId,
    productsState,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
    setProductsState,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

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

  const onBackClicked = () => {
    setProductsState(PRODUCTS_STATE_BY_GRID_MODE[PRODUCT_GRID_VIEW_MODE.DEFAULT]);
    superDispatch({
      action: fetchProducts({
        categoryId,
        state: PRODUCTS_STATE_BY_GRID_MODE[PRODUCT_GRID_VIEW_MODE.DEFAULT],
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

  return productsState === PRODUCT_STATE.MOVED_TO_TRASH ? (
    <FloatButton
      className="mr-4 -mb-2"
      icon={<ArrowLeftOutlined />}
      tooltip={t('BACK')}
      onClick={onBackClicked}
    />
  ) : (
    <FloatButton
      className="mr-4 -mb-2"
      icon={<DeleteOutlined />}
      tooltip={t('TRASH_BIN')}
      onClick={onTrashClicked}
      // badge={{ count: 5, color: 'red' }}
    />
  );
};
