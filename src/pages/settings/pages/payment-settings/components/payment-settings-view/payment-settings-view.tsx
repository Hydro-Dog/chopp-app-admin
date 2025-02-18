import { useTranslation } from 'react-i18next';
import { Descriptions, Button, Flex, Space } from 'antd';
import type { DescriptionsProps } from 'antd';

type Props = {
  toggle: () => void;
};

export const PaymentSettingsView = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const items: DescriptionsProps['items'] = [
    {
      key: 'shopId',
      label: t('SHOP_ID'),
      children: '-',
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
