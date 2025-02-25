import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Tooltip, Button, Space } from 'antd';
import { z } from 'zod';
import { usePaymentSettingsFormSchema } from './hooks';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PaymentSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const paymentSettingsFormSchema = usePaymentSettingsFormSchema();
  type PaymentSettingsFormType = z.infer<typeof paymentSettingsFormSchema>;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaymentSettingsFormType>({
    resolver: zodResolver(paymentSettingsFormSchema),
    defaultValues: {
      shopId: '',
    },
  });

  const onSubmit: SubmitHandler<PaymentSettingsFormType> = (paymentData) => {
    console.log(paymentData);
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
        <Button onClick={handleSubmit(onSubmit)} type="primary">
          {t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
