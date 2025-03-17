import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { RootState } from '@store/store';
import { Alert, Checkbox, DescriptionsProps, Space, Tooltip } from 'antd';

export const useGetDescriptionItems = (): DescriptionsProps['items'] => {
  const { t } = useTranslation();
  const { clientAppConfigData: pricingData } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );

  console.log('pricingData: ', pricingData);

  return [
    {
      key: 'averageDeliveryCost',
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}
          <Tooltip title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: pricingData?.averageDeliveryCost || '-',
    },
    {
      key: 'averageDeliveryCost',
      children: <Alert type="info" message={t('PRICING_PAGE.PRICE_HINT')} />,
    },
    {
      key: 'freeDeliveryIncluded',
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.FREE_SHIPPING')}
          <Tooltip title={t('PRICING_PAGE.PRICE_HINT')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: <Checkbox disabled checked={pricingData?.freeDeliveryIncluded} />,
    },
    {
      key: 'freeDeliveryThreshold',
      label: (
        <Space size={4}>
          {t('PRICE')}
          <Tooltip title={t('PRICING_PAGE.DELIVERY_PRICE_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: pricingData?.freeDeliveryThreshold || '-',
    },
  ];
};
