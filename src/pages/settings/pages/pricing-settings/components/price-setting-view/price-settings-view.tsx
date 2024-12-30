import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Descriptions, Flex, Space } from 'antd';
import type { DescriptionsProps } from 'antd';

type Props = {
  toggle: () => void;
};

export const PriceSettingsView = ({ toggle }: Props) => {
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

  return (
    <Flex vertical gap={16}>
      <Descriptions column={1} size={'default'} items={items} />
      <Space>
        <Button className="mt-5" type="primary" onClick={toggle}>
          {t('EDIT')}
        </Button>
      </Space>
    </Flex>
  );
};
