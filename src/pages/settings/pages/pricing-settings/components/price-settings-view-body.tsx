import { useTranslation } from 'react-i18next';
import { Checkbox, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

export const PriceSettingsViewBody: React.FC = () => {
  const { t } = useTranslation();
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: '123123123',
    },
    {
      key: '2',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: <Checkbox disabled checked />,
    },
    {
      key: '3',
      label: t('PRICE'),
      children: '333333',
    },
  ];
  return <Descriptions column={1} size={'default'} items={items} />;
};
