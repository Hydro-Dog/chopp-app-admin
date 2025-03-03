import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '@shared/index';
import { Product } from '@shared/types';
import { Col, Row, Slider, Spin } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';
import { DeleteProductModal } from '../delete-product-modal';
import { MoveToTrashModal } from '../move-to-trash-modal';
import { ProductCard } from './components';

const colCounts: Record<PropertyKey, number> = { 0: 4, 1: 6, 2: 8 };

type Props = {
  items: Product[];
  loading?: boolean;
};

export const ProductsGrid = ({ items, loading }: Props) => {
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

  const [currentItemData, setCurrentItemData] = useState<Product>();

  useEffect(() => {
    const savedColCountKey = localStorage.getItem(STORAGE_KEYS.PRODUCTS_GRID_SCALE);
    if (savedColCountKey !== null) {
      setColCountKey(Number(savedColCountKey));
    }
  }, []);

  const [colCountKey, setColCountKey] = useState(1);

  const handleSliderChange = (value: number) => {
    setColCountKey(value);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_GRID_SCALE, value.toString());
  };

  const colCount = colCounts[colCountKey];

  if (loading && !items.length) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Slider
        min={0}
        max={Object.keys(colCounts).length - 1}
        value={colCountKey}
        onChange={handleSliderChange}
        marks={colCounts}
        step={null}
        tooltip={{ formatter: (value) => colCounts[value as number] }}
      />

      <div style={{ width: `calc(100% - 12px)` }}>
        <Row gutter={[8, 8]}>
          {items?.map((item) => {
            return (
              <Col key={item.id} span={`${24 / colCount}`}>
                {/* <Card
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
                </Card> */}

                <ProductCard
                  item={item}
                  openCreateProductModal={openCreateProductModal}
                  openMoveToTrashModal={openMoveToTrashModal}
                  openDeleteModal={openDeleteModal}
                  setCurrentItemData={setCurrentItemData}
                />
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
    </div>
  );
};
