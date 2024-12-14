import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { useSearchParamValue } from '@shared/hooks';
import { AppDispatch, FETCH_STATUS, fetchProducts, Product, RootState } from '@store/index';
import { Col, Row, Spin, Tooltip } from 'antd';
import { Card } from 'antd';
import { CreateEditProductModal } from '../create-edit-product-modal';
import { useBoolean } from 'usehooks-ts';

const { Meta } = Card;

type Props = {
  style?: Record<string, any>;
};

export const ProductsGrid = ({ style }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const categoryId = useSearchParamValue('id');
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const {
    value: isCreateProductModalOpen,
    setTrue: openCreateProductModal,
    toggle: toggleCreateProductModal,
  } = useBoolean();

  const [currentItemData, setCurrentItemData] = useState<Product>();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProducts({ categoryId }));
    }
  }, [categoryId]);

  const onSettingClicked = (item: Product) => {
    setCurrentItemData(item);
    openCreateProductModal();
  };

  if (fetchProductsStatus === FETCH_STATUS.LOADING) {
    return <Spin size="large" />;
  }

  console.log('currentItemData: ', currentItemData)

  return (
    <>
      <div className="pl-3 pt-3" style={style}>
        <Row gutter={[16, 16]}>
          {products?.items?.map((item) => (
            <Col key={item.id} span={6}>
              <Card
                onClick={() => {}}
                hoverable
                cover={
                  <img
                    className="aspect-square object-cover "
                    alt={item.title}
                    src={import.meta.env.VITE_BASE_URL_FILES + item.images[0]}
                  />
                }
                actions={[
                  <Tooltip key="edit" title={t('EDIT')}>
                    <SettingOutlined onClick={() => onSettingClicked(item)} />
                  </Tooltip>,
                  <Tooltip key="preview" title={t('PREVIEW')}>
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
          ))}
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
