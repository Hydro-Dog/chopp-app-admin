import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchPricing } from '@store/slices';
import { FETCH_STATUS } from '@store/types';
import { InputNumber, Checkbox, Tooltip, Alert, Form, Space, Button } from 'antd';
import { z } from 'zod';
import { useCreatePricingFormSchema } from './hooks/use-create-pricing-form-schema';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PriceSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const submitStatus = useSelector((state) => state.pricing.submitStatus);
  const submitError = useSelector((state) => state.pricing.submitError);

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

  const onSubmit: SubmitHandler<CreatePricingFormType> = async (data) => {
    try {
      await dispatch(fetchPricing(data)).unwrap();
      toggle();
    } catch (error) {
      console.error('Ошибка', error);
    }
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

      {submitStatus === FETCH_STATUS.ERROR && (
        <Alert type="error" message={submitError?.message} showIcon />
      )}
      {submitStatus === FETCH_STATUS.SUCCESS && (
        <Alert type="success" message="Успешно" showIcon />
      )}

      <Space>
        <Button onClick={onCancel} disabled={submitStatus === FETCH_STATUS.LOADING}>
          {t('CANCEL')}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="primary"
          loading={submitStatus === FETCH_STATUS.LOADING}
          disabled={submitStatus === FETCH_STATUS.LOADING}>
          {submitStatus === FETCH_STATUS.LOADING ? t('SAVING') : t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
