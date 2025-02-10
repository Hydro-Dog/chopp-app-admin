import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { Product } from '@shared/types';
import { Col, Row, Spin, Tooltip } from 'antd';
import { Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { CreateEditProductModal } from '../create-edit-product-modal';
import { sortImages } from './utils/sort-images';

const { Meta } = Card;

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
      <div style={{ width: `calc(100% - 12px)` }}>
        <Row gutter={[8, 8]}>
          {items?.map((item) => {
            return (
              <Col key={item.id} span={4}>
                <Card
                  hoverable
                  cover={
                    <img
                      className="aspect-square object-cover "
                      alt={item.title}
                      src={import.meta.env.VITE_BASE_URL_FILES + sortImages(item)?.[0]?.path}
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
        product={currentItemData}
        id={currentItemData?.id}
      />
    </>
  );
};
