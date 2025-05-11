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
      {/* <Slider
        className="m-0 mb-4"
        min={0}
        max={Object.keys(colCounts).length - 1}
        value={colCountKey}
        onChange={handleSliderChange}
        marks={colCounts}
        step={null}
        tooltip={{ formatter: (value) => colCounts[value as number] }}
      /> */}

      <div style={{ width: `calc(100% - 12px)` }}>
        <Row gutter={[8, 8]}>
          {items?.map((item) => {
            return (
              <Col key={item.id} span={`${24 / colCount}`}>
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
