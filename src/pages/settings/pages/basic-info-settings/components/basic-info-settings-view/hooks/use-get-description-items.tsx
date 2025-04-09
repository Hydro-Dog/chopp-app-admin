import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { RootState } from '@store/store';
import { DescriptionsProps, Space, Tooltip } from 'antd';

export const useGetDescriptionItems = (): DescriptionsProps['items'] => {
  const { t } = useTranslation();
  const { clientAppConfigData: pricingData } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );

  return [
    {
      key: 'deliveryAndPaymentsVerbose',
      labelStyle: { width: 200 },
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE')}
          <Tooltip title={t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: pricingData?.publicOfferVerbose ? (
        <div className="line-clamp-4">{pricingData?.publicOfferVerbose}</div>
      ) : (
        '-'
      ),
    },
    {
      key: 'description',
      labelStyle: { width: 200 },
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.DESCRIPTION_VERBOSE')}
          <Tooltip title={t('PRICING_PAGE.DESCRIPTION_VERBOSE_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: pricingData?.publicOfferVerbose ? (
        <div className="line-clamp-4">{pricingData?.description}</div>
      ) : (
        '-'
      ),
    },
  ];
};
