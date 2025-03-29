import { PRODUCTS_STATE_BY_GRID_MODE } from '@pages/products/constants';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { PRODUCT_GRID_VIEW_MODE, PRODUCT_STATE, updateListItemById } from '@shared/index';
import { PaginationResponse, Product } from '@shared/types';
import { fetchProducts, updateProductVisibility, UpdateProductVisibilityDTO } from '@store/slices';
import { Typography } from 'antd';
import { Card } from 'antd';

import { useGetCardActions } from '../../hooks';
import { sortImages } from '../../utils/sort-images';

const { Text } = Typography;
const { Meta } = Card;

type Props = {
  item: Product;
  openCreateProductModal: () => void;
  openMoveToTrashModal: () => void;
  openDeleteModal: () => void;
  setCurrentItemData: (item: Product) => void;
};

export const ProductCard = ({
  item,
  openCreateProductModal,
  openMoveToTrashModal,
  openDeleteModal,
  setCurrentItemData,
}: Props) => {
  const {
    setPageProducts,
    categoryId,
    search,
    limit,
    page,
    pageProducts,
    setPage,
    setTotalItems,
    setTotalPages,
    setLimit,
  } = useProductsContext();
  const { superDispatch: updateProductDispatch } = useSuperDispatch<
    Product,
    UpdateProductVisibilityDTO
  >();
  const { superDispatch: fetchProductsDispatch } = useSuperDispatch<
    PaginationResponse<Product>,
    unknown
  >();

  const onSettingClicked = (item: Product) => {
    setCurrentItemData(item);
    openCreateProductModal();
  };

  const onMoveToTrashClicked = (item: Product) => {
    setCurrentItemData(item);
    openMoveToTrashModal();
  };

  const onDeleteClicked = (item: Product) => {
    setCurrentItemData(item);
    openDeleteModal();
  };

  const onRevertTrashClicked = (item: Product) => {
    updateProductDispatch({
      action: updateProductVisibility({ id: item.id, state: PRODUCT_STATE.HIDDEN }),
      thenHandler: (product) => {
        setPageProducts((prevProducts) => updateListItemById(prevProducts, product));
        fetchProductsDispatch({
          action: fetchProducts({
            categoryId,
            state: PRODUCTS_STATE_BY_GRID_MODE[PRODUCT_GRID_VIEW_MODE.TRASH],
            page: pageProducts.length === 1 ? page - 1 : page,
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
      },
    });
  };

  const { getActions } = useGetCardActions({
    onSettingClicked,
    onMoveToTrashClicked,
    onDeleteClicked,
    onRevertTrashClicked,
  });

  return (
    <Card
      size="small"
      hoverable
      cover={
        <div className="!flex items-center justify-center">
          <img
            className="aspect-video object-cover"
            alt={item.title}
            src={import.meta.env.VITE_BASE_URL_FILES + sortImages(item)?.[0]?.path}
          />
        </div>
      }
      title={<Text>{item.title}</Text>}
      actions={getActions(item)}>
      <Meta description={<div className="line-clamp-2">{item.description}</div>} />
    </Card>
  );
};
