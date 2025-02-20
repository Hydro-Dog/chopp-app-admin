import { DeleteOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { useProductsContext } from '@pages/products/context';
import { PRODUCT_STATE } from '@shared/enum';
import { Typography } from 'antd';
import { t } from 'i18next';

const { Title } = Typography;

export const HeaderTitle = () => {
  const { productsState } = useProductsContext();

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
      <Title className="!m-0" level={4}>
        {t('PRODUCTS')}
      </Title>
    </>
  );
};
