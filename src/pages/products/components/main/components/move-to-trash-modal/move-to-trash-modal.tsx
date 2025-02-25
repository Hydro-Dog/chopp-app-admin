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

export const MoveToTrashModal = ({ open, onCancel, onOk, product }: Props) => {
  const { t } = useTranslation();
  const { superDispatch: updateProductDispatch } = useSuperDispatch<
    Product,
    UpdateProductVisibilityDTO
  >();
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

    updateProductDispatch({
      action: updateProductVisibility({ state: PRODUCT_STATE.MOVED_TO_TRASH, id: product.id }),
      thenHandler: (product) => {
        showErrorNotification({
          message: t('SUCCESS'),
          description: t('PRODUCT_MOVED_TO_TRASH', { title: product.title }),
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
      title={t('MOVE_TO_TRASH')}
      open={open}
      confirmLoading={updateProductStatus === FETCH_STATUS.LOADING}
      onOk={handleOk}
      onCancel={handleCancel}
      okTitle={t('MOVE_TO_TRASH')}
      okColor="danger">
      <Alert message={<Text>{t('MOVE_TO_TRASH_HELPER_TEXT')}</Text>} type="info" />
    </CustomModal>
  );
};
