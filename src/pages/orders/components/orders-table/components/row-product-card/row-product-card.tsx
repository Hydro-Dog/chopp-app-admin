import { useTranslation } from 'react-i18next';
import { Tooltip, Typography, Descriptions } from 'antd';
import {
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  RocketTwoTone,
} from '@ant-design/icons';
import { ChoppTag, formatPhoneNumber, Order, useThemeToken } from '@shared/index';
import { sortProductImages } from '@shared/utils/sort-product-images';

const { Text } = Typography;

const deliveryProductId = import.meta.env.VITE_DELIVERY_PRODUCT_ID;

type Props = {
  record: Order;
};

export const RowProductCard = ({ record }: Props) => {
  const { t } = useTranslation();
  const themeToken = useThemeToken();

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* 💡 Блок с общей информацией о заказе */}
      <Descriptions size="small" column={1} bordered title={t('ORDER_DETAILS')} className="w-full">
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> {t('FULL_NAME')}
            </>
          }>
          {record.name || '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <PhoneOutlined /> {t('PHONE_NUMBER')}
            </>
          }>
          {formatPhoneNumber(record.phoneNumber) || '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <HomeOutlined /> {t('ADDRESS')}
            </>
          }>
          {record.address || '-'}
        </Descriptions.Item>
      </Descriptions>

      {/* 🖼️ Карточки товаров */}
      <div className="flex flex-wrap gap-4">
        {record.items.map((item) => {
          const isDelivery = item.product.id === deliveryProductId;
          const imagePath = !isDelivery ? sortProductImages(item.product)?.[0]?.path : null;

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
              ) : isDelivery ? (
                <div
                  className="w-full aspect-square rounded-xl mb-2 flex items-center justify-center text-3xl text-blue-500"
                  style={{
                    background: themeToken.colorFillAlter,
                    color: themeToken.colorTextQuaternary,
                  }}>
                  <RocketTwoTone rotate={45} />
                </div>
              ) : (
                <div
                  className="w-full aspect-square rounded-xl mb-2 flex items-center justify-center text-xs text-gray-400"
                  style={{
                    background: themeToken.colorFillAlter,
                    color: themeToken.colorTextQuaternary,
                  }}>
                  {t('NO_IMAGE')}
                </div>
              )}

              <Tooltip title={`${t('PRICE')} × ${t('QUANTITY')}`}>
                <ChoppTag icon={<ShoppingCartOutlined className="text-md" />} color="blue">
                  <Text style={{ color: 'inherit' }} className="!inline">
                    {item.price}₽ × {item.quantity}
                  </Text>
                </ChoppTag>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};
