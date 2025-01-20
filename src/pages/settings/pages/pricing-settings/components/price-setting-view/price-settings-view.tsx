import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPricingData } from '@store/slices';
import { RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { Button, Checkbox, Descriptions, Flex, Space, Spin, Alert } from 'antd';
import type { DescriptionsProps } from 'antd';

type Props = {
  toggle: () => void;
};

export const PriceSettingsView = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pricingData = useSelector((state: RootState) => state.pricing.data);
  const fetchStatus = useSelector((state: RootState) => state.pricing.fetchStatus);
  const fetchError = useSelector((state: RootState) => state.pricing.fetchError);

  useEffect(() => {
    return dispatch(fetchPricingData()).unwrap();
  }, [dispatch]);

  const items: DescriptionsProps['items'] = [
    {
      key: 'averageDeliveryCost',
      label: t('PRICING_PAGE.AVERAGE_DELIVERY_COST'),
      children: pricingData?.averageDeliveryCost ?? t('ERROR'),
    },
    {
      key: 'freeDeliveryIncluded',
      label: t('PRICING_PAGE.FREE_SHIPPING'),
      children: <Checkbox disabled checked={pricingData?.freeDeliveryIncluded ?? false} />,
    },
    {
      key: 'freeDeliveryThreshold',
      label: t('PRICE'),
      children: pricingData?.freeDeliveryThreshold ?? t('ERROR'),
    },
  ];

  if (fetchStatus === FETCH_STATUS.LOADING) {
    return <Spin tip={t('LOADING')} />;
  }

  if (fetchStatus === FETCH_STATUS.ERROR) {
    return <Alert type="error" message={fetchError?.message || t('UNKNOWN_ERROR')} />;
  }

  if (!pricingData) {
    return <Alert type="info" message={t('NO_DATA_AVAILABLE')} />;
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
