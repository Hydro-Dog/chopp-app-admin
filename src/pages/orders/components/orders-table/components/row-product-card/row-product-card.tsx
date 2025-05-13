import { useTranslation } from 'react-i18next';
import { Tooltip, Tag, Typography } from 'antd';
import {
  CreditCardOutlined,
  DatabaseOutlined,
  DollarOutlined,
  NumberOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { ChoppTag, Order } from '@shared/index';
import { sortProductImages } from '@shared/utils/sort-product-images';

const { Text, Title } = Typography;

type Props = {
  record: Order;
};

export const RowProductCard = ({ record }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 p-2">
      {record.items.map((item) => {
        const imagePath = sortProductImages(item.product)?.[0]?.path;

        return (
          <div
            key={item.id}
            className="w-40 border rounded-lg p-2 flex flex-col items-center text-center">
            <div className="text-sm mb-2">{item.product.title}</div>

            {imagePath ? (
              <img
                src={import.meta.env.VITE_BASE_URL_FILES + imagePath}
                alt={item.product.title}
                className="w-full aspect-square object-cover rounded-xl mb-2"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center text-xs text-gray-400">
                {t('NO_IMAGE')}
              </div>
            )}

            <div className="flex gap-2">
              <Tooltip title={`${t('PRICE')} × ${t('QUANTITY')}`}>
                <ChoppTag icon={<ShoppingCartOutlined className="text-md" />} color="blue">
                  <Text style={{ color: 'inherit' }} className="!inline">
                    {item.price}₽ × {item.quantity}
                  </Text>
                </ChoppTag>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
};
