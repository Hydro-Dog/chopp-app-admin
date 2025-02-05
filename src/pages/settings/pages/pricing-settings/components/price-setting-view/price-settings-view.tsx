import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNotificationContext } from '@shared/context';
import { fetchPricingData } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@shared/index';
import { Button, Descriptions, Flex, Space, Spin } from 'antd';
import { useGetDescriptionItems } from './hooks';

type Props = {
  toggle: () => void;
};

export const PriceSettingsView = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const { showErrorNotification } = useNotificationContext();
  const dispatch = useDispatch<AppDispatch>();
  const { fetchPricingDataStatus } = useSelector((state: RootState) => state.pricing);

  useEffect(() => {
    dispatch(fetchPricingData())
      .unwrap()
      .catch((error) => showErrorNotification({ message: t('ERROR'), description: error.message }));
  }, [dispatch]);

  const items = useGetDescriptionItems()

  if (fetchPricingDataStatus === FETCH_STATUS.LOADING) {
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
