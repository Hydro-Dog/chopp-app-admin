import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { RootState } from '@store/store';
import { DescriptionsProps, Space, Tooltip } from 'antd';

export const useGetDescriptionItems = (): DescriptionsProps['items'] => {
  const { t } = useTranslation();
  const { clientAppConfigData: basicInfoData } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );

  return [
    {
      key: 'deliveryAndPaymentsVerbose',
      labelStyle: { width: 200 },
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.DELIVERY_AND_PAYMENT_VERBOSE')}
          <Tooltip title={t('PRICING_PAGE.DELIVERY_AND_PAYMENT_VERBOSE_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: pricingData?.deliveryAndPaymentsVerbose ? (
        <div className="line-clamp-4">{pricingData?.deliveryAndPaymentsVerbose}</div>
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
      children: basicInfoData?.description ? (
        <div className="line-clamp-4">{basicInfoData?.description}</div>
      ) : (
        '-'
      ),
    },
    {
      key: 'phoneNumber',
      labelStyle: { width: 200 },
      label: (
        <Space size={4}>
          {t('PRICING_PAGE.PHONE_NUMBER_VERBOSE')}
          <Tooltip title={t('PRICING_PAGE.PHONE_NUMBER_VERBOSE_TOOLTIP')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      children: basicInfoData?.phoneNumber ? (
        <div className="line-clamp-4">{basicInfoData?.phoneNumber}</div>
      ) : (
        '-'
      ),
    },
    {
      key: 'publicOfferVerbose',
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
    
  ];
};
