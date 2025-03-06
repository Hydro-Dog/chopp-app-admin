import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotificationContext } from '@shared/context';
import { Form, Input, Tooltip, Button, Space } from 'antd';
import { z } from 'zod';
import { usePaymentSettingsFormSchema } from './hooks';
import { useSuperDispatch } from '@shared/hooks';
import { postPaymentSettings } from '@store/slices';
import { RootState } from '@store/store';
import { FETCH_STATUS } from '@shared/index';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PaymentSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch();
  const { showErrorNotification } = useNotificationContext();
  const { paymentSettings, postPaymentSettingsStatus } = useSelector(
    (state: RootState) => state.paymentSettings,
  );

  const paymentSettingsFormSchema = usePaymentSettingsFormSchema();
  type PaymentSettingsFormType = z.infer<typeof paymentSettingsFormSchema>;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PaymentSettingsFormType>({
    resolver: zodResolver(paymentSettingsFormSchema),
    defaultValues: {
      shopId: '',
    },
  });

  useEffect(() => {
    if (paymentSettings) {
      reset({
        shopId: paymentSettings.shopId,
      });
    }
  }, [paymentSettings, reset]);

  const onSubmit: SubmitHandler<PaymentSettingsFormType> = (paymentSettings) => {
    superDispatch({
      action: postPaymentSettings(paymentSettings),
      thenHandler: onCancel,
      catchHandler: (error) => {
        showErrorNotification({
          message: t('ERROR'),
          description: error.message,
        });
      },
    });
  };

  const onCancel = () => {
    toggle();
  };

  return (
    <Form layout="vertical" className="flex flex-col gap-4">
      <Item
        validateStatus={errors.shopId && 'error'}
        help={errors.shopId?.message}
        className="!m-0"
        label={
          <Space size={4}>
            {'Shop Id'}
            <Tooltip title={t('SHOP_ID_TOOLTIP')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }>
        <Controller
          name="shopId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="string"
              className="w-full"
              min={1}
              placeholder={t('ENTER_SHOP_ID')}
            />
          )}
        />
      </Item>

      <Space>
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="primary"
          loading={postPaymentSettingsStatus === FETCH_STATUS.LOADING}
          disabled={postPaymentSettingsStatus === FETCH_STATUS.LOADING}>
          {postPaymentSettingsStatus === FETCH_STATUS.LOADING ? t('SAVING') : t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
