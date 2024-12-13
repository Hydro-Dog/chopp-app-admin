import { useTranslation } from 'react-i18next';
import { Checkbox, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

export const PriceSettingsView = () => {
  const { t } = useTranslation();
  const items: DescriptionsProps['items'] = [
    {
      key: 'averageDeliveryCost',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: '12222222222222',
    },
    {
      key: 'freeDeliveryIncluded',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: <Checkbox disabled checked />,
    },
    {
      key: 'freeDeliveryThreshold',
      label: t('PRICE'),
      children: '333333',
    },
  ];
  return <Descriptions column={1} size={'default'} items={items} />;
};

// {
//   "averageDeliveryCost": 20,
//   "freeDeliveryIncluded": false,
//   "freeDeliveryThreshold": 100
// }
