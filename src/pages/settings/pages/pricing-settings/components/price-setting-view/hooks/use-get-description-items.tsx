import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChoppTextWithTooltip } from '@shared/components';
import { RootState } from '@store/store';
import { Alert, Checkbox, DescriptionsProps } from 'antd';

export const useGetDescriptionItems = (): DescriptionsProps['items'] => {
  const { t } = useTranslation();
  const { clientAppConfigData: pricingData } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );

  return [
    {
      key: 'averageDeliveryCost',
      labelStyle: {width: 200},
      label: (
        <ChoppTextWithTooltip
          title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}
          tooltipText={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}
        />
      ),
      children: `${pricingData?.averageDeliveryCost}₽` || '-',
    },
    // {
    //   key: 'averageDeliveryCost',
    //   children: <Alert type="info" message={t('PRICING_PAGE.PRICE_HINT')} />,
    // },
    {
      key: 'freeDeliveryIncluded',
      labelStyle: {width: 200},
      label: (
        <ChoppTextWithTooltip
          title={t('PRICING_PAGE.FREE_SHIPPING')}
          tooltipText={t('PRICING_PAGE.PRICE_HINT')}
        />
      ),
      children: <Checkbox disabled checked={pricingData?.freeDeliveryIncluded} />,
    },
    {
      key: 'freeDeliveryThreshold',
      labelStyle: {width: 200},
      label: (
        <ChoppTextWithTooltip
          title={t('PRICE')}
          tooltipText={t('PRICING_PAGE.DELIVERY_PRICE_TOOLTIP')}
        />
      ),
      children: `${pricingData?.freeDeliveryThreshold}₽` || '-',
    },
  ];
};
