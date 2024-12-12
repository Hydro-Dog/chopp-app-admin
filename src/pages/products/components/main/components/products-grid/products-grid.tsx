import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { useSearchParamValue } from '@shared/hooks';
import { AppDispatch, fetchProducts, RootState } from '@store/index';
import { Col, Row, Tooltip } from 'antd';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

export const ProductsGrid = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const categoryId = useSearchParamValue('id');
  const { products } = useSelector((state: RootState) => state.products);

  console.log('products: ', products);
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProducts({ categoryId }));
    }
  }, [categoryId]);

  return (
    <div className="pl-3 pt-3">
      <Row gutter={[16, 16]}>
        {products?.items?.map((item) => (
          <Col key={item.id} span={6}>
            <Card
              onClick={() => {}}
              hoverable
              cover={<img alt={item.title} src={'http://localhost:6001/' + item.images[0]} />}
              actions={[
                <Tooltip key="edit" title={t('EDIT')}>
                  <SettingOutlined />
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
  );
};
