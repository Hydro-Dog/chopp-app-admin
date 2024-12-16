import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { Pagination } from '@shared/index';
import { AppDispatch, FETCH_STATUS, fetchProducts, Product, RootState } from '@store/index';
import { Button, Col, Row, Spin, Tooltip } from 'antd';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';

const { Meta } = Card;

function sortImages(data) {
  const { images, imagesOrder } = data;

  // Создаем новый массив, где элементы соответствуют порядку в imagesOrder
  const sortedImages = imagesOrder.map((id) => images.find((image) => image.id === id));

  return sortedImages;
}

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
  } = useBoolean()

  const [currentItemData, setCurrentItemData] = useState<Product>();

  const onSettingClicked = (item: Product) => {
    setCurrentItemData(item);
    openCreateProductModal();
  };

  if (loading && !items.length) {
    return <Spin size="large" />;
  }

  return (
    <>
      {/* calc(100% - gutter) */}
      <div style={{ width: `calc(100% - 12px)` }}>
        <Row gutter={[12, 12]}>
          {items?.map((item) => {
            return (
              <Col key={item.id} span={6}>
                <Card
                  onClick={() => {}}
                  hoverable
                  cover={
                    <img
                      className="aspect-square object-cover "
                      alt={item.title}
                      src={import.meta.env.VITE_BASE_URL_FILES + sortImages(item)?.[0].path}
                    />
                  }
                  actions={[
                    <Tooltip key="edit" title={t('EDIT')}>
                      <SettingOutlined onClick={() => onSettingClicked(item)} />
                    </Tooltip>,
                    <Tooltip key="settings" title={t('PREVIEW')}>
                      <EyeOutlined />
                    </Tooltip>,
                    <Tooltip key="delete" title={t('DELETE')}>
                      <DeleteOutlined />
                    </Tooltip>,
                  ]}>
                  <Meta
                    // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={item.title}
                    description={<div className="line-clamp-2">{item.description}</div>}
                  />
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
        values={currentItemData}
        id={currentItemData?.id}
      />
    </>
  );
};
