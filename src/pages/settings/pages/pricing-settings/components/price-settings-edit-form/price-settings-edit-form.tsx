import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotificationContext } from '@shared/context';
import { useSuperDispatch } from '@shared/hooks';
import { postPricing } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { FETCH_STATUS } from '@store/types';
import { InputNumber, Checkbox, Tooltip, Alert, Form, Space, Button } from 'antd';
import { z } from 'zod';
import { useCreatePricingFormSchema } from './hooks/use-create-pricing-form-schema';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PriceSettingsEditForm = ({ toggle }: Props) => {
  const { showErrorNotification } = useNotificationContext();
  const superDispatch = useSuperDispatch();

  const { t } = useTranslation();

  const pricing = useSelector((state: RootState) => state.pricing);
  const createPricingFormSchema = useCreatePricingFormSchema();
  type CreatePricingFormType = z.infer<typeof createPricingFormSchema>;

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm<CreatePricingFormType>({
    resolver: zodResolver(createPricingFormSchema),
    defaultValues: {
      freeDeliveryIncluded: false,
    },
  });

  const freeDeliveryIncluded = watch('freeDeliveryIncluded');

  useEffect(() => {
    if (!freeDeliveryIncluded) {
      setValue('freeDeliveryThreshold', 0);
    }
  }, [freeDeliveryIncluded, setValue]);

  const onSubmit: SubmitHandler<CreatePricingFormType> = (pricingData) => {
    superDispatch({
      action: postPricing(pricingData),
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
        <Button onClick={onCancel} disabled={pricing.submitStatus === FETCH_STATUS.LOADING}>
          {t('CANCEL')}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="primary"
          loading={pricing.submitStatus === FETCH_STATUS.LOADING}
          disabled={pricing.submitStatus === FETCH_STATUS.LOADING}>
          {pricing.submitStatus === FETCH_STATUS.LOADING ? t('SAVING') : t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
