import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { CustomModal } from '@shared/components';
import {
  useNotificationContext,
  useSuperDispatch,
  FETCH_STATUS,
  Product,
  PRODUCT_STATE,
  PaginationRequestQuery,
  PaginationResponse,
} from '@shared/index';
import {
  deleteProduct,
  fetchProducts,
  RootState,
  updateProductVisibility,
  UpdateProductVisibilityDTO,
} from '@store/index';
import { Alert, Typography } from 'antd';

const { Text } = Typography;

type Props = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  product?: Product;
  mode?: 'edit' | 'create';
  id?: number;
};

export const DeleteProductModal = ({ open, onCancel, onOk, product }: Props) => {
  const { t } = useTranslation();
  const { superDispatch: deleteProductDispatch } = useSuperDispatch<unknown, { id: number }>();
  const { superDispatch: fetchProductsDispatch } = useSuperDispatch<
    PaginationResponse<Product>,
    { categoryId: string } & PaginationRequestQuery
  >();

  const {
    search,
    page,
    limit,
    categoryId,
    productsState,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();

  const { showErrorNotification } = useNotificationContext();
  const { updateProductStatus } = useSelector((state: RootState) => state.products);

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    if (!product?.id) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERRORS.PRODUCT_ID_IS_REQUIRED', { mb: 2 }),
      });

      return;
    }
    deleteProductDispatch({
      action: deleteProduct({ id: product.id }),
      thenHandler: (res) => {
        console.log('res: ', res);
        showErrorNotification({
          message: t('SUCCESS'),
          description: t('PRODUCT_DELETED', { title: product.title }),
        });

        fetchProductsDispatch({
          action: fetchProducts({
            categoryId,
            state: productsState,
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
        onOk();
      },
    });
  };

  return (
    <CustomModal
      title={t('DELETE_PRODUCT')}
      open={open}
      confirmLoading={updateProductStatus === FETCH_STATUS.LOADING}
      onOk={handleOk}
      onCancel={handleCancel}
      okTitle={t('DELETE')}
      okColor="danger">
      <Alert message={<Text>{t('DELETE_PRODUCT_HELPER_TEXT')}</Text>} type="info" />
    </CustomModal>
  );
};
