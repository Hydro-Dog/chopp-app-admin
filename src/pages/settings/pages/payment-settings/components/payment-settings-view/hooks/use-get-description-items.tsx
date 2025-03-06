import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { DescriptionsProps, Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export const useGetDescriptionItems = (): DescriptionsProps['items'] => {
  const { t } = useTranslation();
  const { paymentSettings } = useSelector((state: RootState) => state.paymentSettings);

  return [
    {
      key: 'shopId',
      label: (
        <Space size={4}>
          {'Shop Id'}
          <Tooltip title={t('SHOP_ID_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: paymentSettings?.shopId || '-',
    },
  ];
};
