import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined, ShopOutlined } from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { PRODUCT_STATE } from '@shared/enum';
import { RootState } from '@store/index';
import { Flex, Typography } from 'antd';
import { t } from 'i18next';

const { Title } = Typography;

export const HeaderTitle = () => {
  const { productsState } = useProductsContext();
  const { categoryId } = useProductsContext();
  const { categories } = useSelector((state: RootState) => state.productCategory);

  const categoryTitle = useMemo(
    () => categories?.find((item) => item.id === categoryId),
    [categories, categoryId],
  );

  return productsState === PRODUCT_STATE.MOVED_TO_TRASH ? (
    <>
      <DeleteOutlined className="text-xl" />
      <Title className="!m-0" level={4}>
        {t('TRASH_BIN')}
      </Title>
    </>
  ) : (
    <>
      <ShopOutlined className="text-xl" />
      <Flex align="center" gap={4}>
        <Title className="!m-0" level={4}>
          {t('PRODUCTS')}
        </Title>
        <Title level={4} className="!m-0" type="secondary">
          {categoryTitle?.title}
        </Title>
      </Flex>
    </>
  );
};
