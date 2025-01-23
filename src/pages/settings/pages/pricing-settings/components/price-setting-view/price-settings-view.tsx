import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNotificationContext } from '@shared/context';
import { fetchPricingData } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Button, Checkbox, Descriptions, Flex, Space, Spin } from 'antd';
import type { DescriptionsProps } from 'antd';

type Props = {
  toggle: () => void;
};

export const PriceSettingsView = ({ toggle }: Props) => {
  const { showErrorNotification } = useNotificationContext();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const pricing = useSelector((state: RootState) => state.pricing);

  useEffect(() => {
    dispatch(fetchPricingData())
      .unwrap()
      .catch((error) => showErrorNotification({ message: t('ERROR'), description: error.message }));
    if (!pricing.pricingData) {
      showErrorNotification({
        message: t('ERROR'),
        description: t('ERROR'),
      });
    }
  }, [dispatch]);

  const items: DescriptionsProps['items'] = [
    {
      key: 'averageDeliveryCost',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: pricing.pricingData?.averageDeliveryCost ?? null,
    },
    {
      key: 'freeDeliveryIncluded',
      label: t('PRICING_PAGE.FREE_SHIPPING'),
      children: <Checkbox disabled checked={pricing.pricingData?.freeDeliveryIncluded} />,
    },
    {
      key: 'freeDeliveryThreshold',
      label: t('PRICE'),
      children: pricing.pricingData?.freeDeliveryThreshold ?? null,
    },
  ];

  if (pricing.fetchStatus === FETCH_STATUS.LOADING) {
    return <Spin tip={t('LOADING')} />;
  }

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
