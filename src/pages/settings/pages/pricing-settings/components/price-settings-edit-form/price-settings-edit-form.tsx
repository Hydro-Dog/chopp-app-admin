import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputNumber, Checkbox, Tooltip, Alert, Form } from 'antd';
import { z } from 'zod';
import { useCreatePricingFormSchema } from './hooks/use-create-pricing-form-schema';

const { Item } = Form;

type Props = {
  onSuccess: () => void;
};

export const PriceSettingsEditForm = ({ onSuccess }: Props) => {
  const { t } = useTranslation();

  const createPricingFormSchema = useCreatePricingFormSchema();
  type CreatePricingFormType = z.infer<typeof createPricingFormSchema>;

  const methods = useForm<CreatePricingFormType>({
    resolver: zodResolver(createPricingFormSchema),
  });

  const { control, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<CreatePricingFormType> = (data) => {
    console.log(data);
    reset();
    onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)}>
        <div className="w-1/3">
          <Item label={t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}>
            <Controller
              name="averageDeliveryCost"
              control={control}
              render={({ field }) => (
                <Tooltip title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}>
                  <InputNumber
                    type="number"
                    {...field}
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

          <Item label={t('PRICE')}>
            <Controller
              name="freeDeliveryThreshold"
              control={control}
              render={({ field }) => (
                <Tooltip title={t('PRICING_PAGE.DELIVERY_PRICE_TOOLTIP')}>
                  <InputNumber
                    type="number"
                    {...field}
                    prefix="₽"
                    className="w-full"
                    min={0}
                    placeholder={t('PRICING_PAGE.ENTER_PRICE')}
                  />
                </Tooltip>
              )}
            />
          </Item>
        </div>
      </Form>
    </FormProvider>
  );
};
