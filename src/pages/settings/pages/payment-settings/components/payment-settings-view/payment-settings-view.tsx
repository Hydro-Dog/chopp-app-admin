import { useTranslation } from 'react-i18next';
import { Descriptions } from "antd";
import type { DescriptionsProps } from 'antd';

export const PaymentSettingsView =()=>{
const { t } = useTranslation();
const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('SHOP_ID'),
      children: '12222222222222',
    }
  ];
  return <Descriptions column={1} size={'default'} items={items} />;
};
