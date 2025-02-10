import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { updateListItemById, useNotificationContext } from '@shared/index';
import { FETCH_STATUS, Product } from '@shared/types';
import { RootState } from '@store/index';
import { updateProductVisibility, UpdateProductVisibilityDTO } from '@store/slices';
import { Col, Row, Spin, Switch, Tooltip } from 'antd';
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
  const { updateProductVisibilityStatusMap } = useSelector((state: RootState) => state.products);
  const { showSuccessNotification } = useNotificationContext();
  const { setPageProducts } = useProductsContext();
  const { superDispatch } = useSuperDispatch<Product, UpdateProductVisibilityDTO>();

  const [currentItemData, setCurrentItemData] = useState<Product>();

  const onSettingClicked = (item: Product) => {
    setCurrentItemData(item);
    openCreateProductModal();
  };

  const onVisibilityToggled = ({ id, isVisible }: UpdateProductVisibilityDTO) => {
    superDispatch({
      action: updateProductVisibility({ id, isVisible }),
      thenHandler: (product) => {
        showSuccessNotification({
          message: t('SUCCESS'),
          description: t(product.isVisible ? 'PRODUCT_IS_NOW_VISIBLE' : 'PRODUCT_IS_NOW_HIDDEN', {
            title: product.title,
          }),
        });

        setPageProducts((prevProducts) => updateListItemById(prevProducts, product));
      },
    });
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
              <Col key={item.id} span={6}>
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
                        item.isVisible ? 'PRODUCT_VISIBLE_TOOLTIP' : 'PRODUCT_HIDDEN_TOOLTIP',
                      )}>
                      <Switch
                        onChange={(isVisible) => onVisibilityToggled({ id: item.id, isVisible })}
                        checkedChildren={<EyeOutlined />}
                        unCheckedChildren={<EyeInvisibleOutlined />}
                        checked={item.isVisible}
                        loading={
                          updateProductVisibilityStatusMap[String(item.id)] === FETCH_STATUS.LOADING
                        }
                      />
                    </Tooltip>
                  }
                  actions={[
                    <Tooltip key="edit" title={t('EDIT')}>
                      <SettingOutlined onClick={() => onSettingClicked(item)} />
                    </Tooltip>,
                    <Tooltip key="delete" title={t('MOVE_TO_TRASH')}>
                      <DeleteOutlined />
                    </Tooltip>,
                  ]}>
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
    </>
  );
};
