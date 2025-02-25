import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  CloseOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { PRODUCT_STATE, updateListItemById } from '@shared/index';
import { FETCH_STATUS, Product } from '@shared/types';
import { RootState } from '@store/index';
import { updateProductVisibility, UpdateProductVisibilityDTO } from '@store/slices';
import { Col, Row, Slider, Spin, Switch, Tooltip } from 'antd';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';
import { DeleteProductModal } from '../delete-product-modal';
import { sortImages } from './utils/sort-images';
import { useGetCardActions } from './hooks';
import { MoveToTrashModal } from '../move-to-trash-modal';

const { Meta } = Card;

const colCounts: Record<PropertyKey, number> = { 0: 4, 1: 6, 2: 8 };

type Props = {
  items: Product[];
  loading?: boolean;
};

export const ProductsGrid = ({ items, loading }: Props) => {
  const { t } = useTranslation();
  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();
  const {
    value: isMoveToTrashModalOpen,
    setTrue: openMoveToTrashModal,
    setFalse: closeMoveToTrashModal,
  } = useBoolean();
  const {
    value: isDeleteModalOpen,
    setTrue: openDeleteModal,
    setFalse: closeDeleteModal,
  } = useBoolean();

  const { updateProductVisibilityStatusMap } = useSelector((state: RootState) => state.products);
  const { setPageProducts } = useProductsContext();
  const { superDispatch } = useSuperDispatch<Product, UpdateProductVisibilityDTO>();
  const [currentItemData, setCurrentItemData] = useState<Product>();

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

  const onVisibilityToggled = ({ id, state }: UpdateProductVisibilityDTO) => {
    superDispatch({
      action: updateProductVisibility({ id, state }),
      thenHandler: (product) => {
        setPageProducts((prevProducts) => updateListItemById(prevProducts, product));
      },
    });
  };

  const { getActions } = useGetCardActions({
    onSettingClicked,
    onMoveToTrashClicked,
    onDeleteClicked,
  });

  const [colCountKey, setColCountKey] = useState(1);
  const colCount = colCounts[colCountKey];

  if (loading && !items.length) {
    return <Spin size="large" />;
  }

  return (
    <>
      <div style={{ width: '50%', marginBottom: 48 }}>
        <Slider
          min={0}
          max={Object.keys(colCounts).length - 1}
          value={colCountKey}
          onChange={setColCountKey}
          marks={colCounts}
          step={null}
          tooltip={{ formatter: (value) => colCounts[value as number] }}
        />
      </div>
      <div style={{ width: `calc(100% - 12px)` }}>
        <Row gutter={[8, 8]}>
          {items?.map((item) => {
            return (
              <Col key={item.id} span={`${24 / colCount}`}>
                <Card
                  size="small"
                  hoverable
                  cover={
                    <div className="!flex items-center justify-center">
                      <img
                        className="aspect-square object-cover !size-[95%] "
                        alt={item.title}
                        src={import.meta.env.VITE_BASE_URL_FILES + sortImages(item)?.[0]?.path}
                      />
                    </div>
                  }
                  title={item.title}
                  extra={
                    <Tooltip
                      key="isVisible"
                      title={t(
                        item.state === PRODUCT_STATE.DEFAULT
                          ? 'PRODUCT_VISIBLE_TOOLTIP'
                          : 'PRODUCT_HIDDEN_TOOLTIP',
                      )}>
                      <Switch
                        onChange={(isVisible) =>
                          onVisibilityToggled({
                            id: item.id,
                            state: isVisible ? PRODUCT_STATE.DEFAULT : PRODUCT_STATE.HIDDEN,
                          })
                        }
                        checkedChildren={<EyeOutlined />}
                        unCheckedChildren={<EyeInvisibleOutlined />}
                        checked={item.state === PRODUCT_STATE.DEFAULT}
                        loading={
                          updateProductVisibilityStatusMap[String(item.id)] === FETCH_STATUS.LOADING
                        }
                      />
                    </Tooltip>
                  }
                  actions={getActions(item)}>
                  <Meta description={<div className="line-clamp-2">{item.description}</div>} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>

      <CreateEditProductModal
        open={isCreateProductModalOpen}
        onCancel={toggleCreateProductModal}
        onOk={toggleCreateProductModal}
        mode="edit"
        product={currentItemData}
        id={currentItemData?.id}
      />

      <DeleteProductModal
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onOk={closeDeleteModal}
        product={currentItemData}
        id={currentItemData?.id}
      />

      <MoveToTrashModal
        open={isMoveToTrashModalOpen}
        onCancel={closeMoveToTrashModal}
        onOk={closeMoveToTrashModal}
        product={currentItemData}
        id={currentItemData?.id}
      />
    </>
  );
};
