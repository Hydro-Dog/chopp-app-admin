import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputNumber, Checkbox, Tooltip, Alert, Form, Space, Button } from 'antd';
import { z } from 'zod';
import { useCreatePricingFormSchema } from './hooks/use-create-pricing-form-schema';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PriceSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();

  const createPricingFormSchema = useCreatePricingFormSchema();
  type CreatePricingFormType = z.infer<typeof createPricingFormSchema>;

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm<CreatePricingFormType>({
    resolver: zodResolver(createPricingFormSchema),
    defaultValues: {
      freeDeliveryIncluded: false,
    },
  });

  const freeDeliveryIncluded = watch('freeDeliveryIncluded');

  const onSubmit: SubmitHandler<CreatePricingFormType> = (data) => {
    console.log('данные:', data);
    toggle();
  };

  const onCancel = () => {
    reset();
    toggle();
  };

  return (
    <Form layout="vertical" className="flex flex-col gap-4">
      <div className="w-1/3">
        <Item
          help={errors.averageDeliveryCost?.message}
          validateStatus={errors.averageDeliveryCost && 'error'}
          label={t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}>
          <Controller
            name="averageDeliveryCost"
            control={control}
            render={({ field }) => (
              <Tooltip title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}>
                <InputNumber
                  {...field}
                  type="number"
                  prefix="₽"
                  className="w-full"
                  min={0}
                  placeholder={t('PRICING_PAGE.ENTER_PRICE')}
                />
              </Tooltip>
            )}
          />
        </Item>
        <Alert className="mb-2" type="info" message={t('PRICING_PAGE.PRICE_HINT')} showIcon />
        <Item>
          <Controller
            name="freeDeliveryIncluded"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                {t('PRICING_PAGE.FREE_SHIPPING')}
              </Checkbox>
            )}
          />
        </Item>
        <Item
          label={t('PRICE')}
          help={freeDeliveryIncluded && errors.freeDeliveryThreshold?.message}
          validateStatus={freeDeliveryIncluded && errors.freeDeliveryThreshold ? 'error' : ''}>
          <Controller
            name="freeDeliveryThreshold"
            control={control}
            render={({ field }) => (
              <Tooltip title={t('PRICING_PAGE.DELIVERY_PRICE_TOOLTIP')}>
                <InputNumber
                  {...field}
                  type="number"
                  prefix="₽"
                  className="w-full"
                  min={0}
                  placeholder={t('PRICING_PAGE.ENTER_PRICE')}
                  disabled={!freeDeliveryIncluded}
                />
              </Tooltip>
            )}
          />
        </Item>
      </div>

      <Space>
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        <Button onClick={handleSubmit(onSubmit)} type="primary">
          {t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
