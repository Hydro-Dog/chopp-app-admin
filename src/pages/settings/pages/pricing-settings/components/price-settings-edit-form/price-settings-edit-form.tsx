import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotificationContext } from '@shared/context';
import { useSuperDispatch } from '@shared/hooks';
import { FETCH_STATUS } from '@shared/types';
import { postClientAppConfig } from '@store/slices';
import { RootState } from '@store/store';
import { InputNumber, Checkbox, Tooltip, Alert, Form, Space, Button, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { z } from 'zod';
import { useCreatePricingFormSchema } from './hooks/use-create-pricing-form-schema';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const PriceSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch();
  const { showErrorNotification } = useNotificationContext();
  const { clientAppConfigData, postClientAppConfigStatus } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );
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
      deliveryAndPaymentsVerbose: '',
      publicOfferVerbose: '',
    },
  });

  const freeDeliveryIncluded = watch('freeDeliveryIncluded');

  console.log('errors; ', errors);
  useEffect(() => {
    if (clientAppConfigData) {
      reset({
        averageDeliveryCost: clientAppConfigData.averageDeliveryCost,
        freeDeliveryIncluded: clientAppConfigData.freeDeliveryIncluded,
        freeDeliveryThreshold: clientAppConfigData.freeDeliveryThreshold,
        deliveryAndPaymentsVerbose: clientAppConfigData.deliveryAndPaymentsVerbose,
        publicOfferVerbose: clientAppConfigData.publicOfferVerbose,
        description: clientAppConfigData.description,
      });
    }
  }, [clientAppConfigData, reset]);

  const onChangeCheckbox = (event: CheckboxChangeEvent) => {
    setValue('freeDeliveryIncluded', event.target.checked);
    if (!event.target.checked) {
      setValue('freeDeliveryThreshold', 0);
    }
  };

  const onSubmit: SubmitHandler<CreatePricingFormType> = (pricingData) => {
    superDispatch({
      action: postClientAppConfig(pricingData),
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
        className="!m-0"
        help={errors.averageDeliveryCost?.message}
        validateStatus={errors.averageDeliveryCost && 'error'}
        label={
          <Space size={4}>
            {t('PRICING_PAGE.AVERAGE_DELIVERY_COST')}
            <Tooltip title={t('PRICING_PAGE.AVERAGE_DELIVERY_COST_TOOLTIP')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }>
        <Controller
          name="averageDeliveryCost"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              type="number"
              prefix="₽"
              className="w-full"
              min={0}
              placeholder={t('PRICING_PAGE.ENTER_PRICE')}
            />
          )}
        />
      </Item>
      <Alert type="info" message={t('PRICING_PAGE.PRICE_HINT')} />
      <Item className="!m-0">
        <Controller
          name="freeDeliveryIncluded"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={onChangeCheckbox}>
              {t('PRICING_PAGE.FREE_SHIPPING')}
            </Checkbox>
          )}
        />
      </Item>
      <Item
        className="!m-0"
        label={
          <Space size={4}>
            {t('PRICE')}
            <Tooltip title={t('PRICING_PAGE.PRICE_HINT')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }
        help={freeDeliveryIncluded && errors.freeDeliveryThreshold?.message}
        validateStatus={freeDeliveryIncluded && errors.freeDeliveryThreshold ? 'error' : ''}>
        <Controller
          name="freeDeliveryThreshold"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              type="number"
              prefix="₽"
              className="w-full"
              min={0}
              placeholder={t('PRICING_PAGE.ENTER_PRICE')}
              disabled={!freeDeliveryIncluded}
            />
          )}
        />
      </Item>

      <Item
        className="!m-0"
        help={errors.deliveryAndPaymentsVerbose?.message}
        validateStatus={errors.deliveryAndPaymentsVerbose && 'error'}
        label={
          <Space size={4}>
            {t('PRICING_PAGE.DELIVERY_AND_PAYMENT_VERBOSE')}
            <Tooltip title={t('PRICING_PAGE.DELIVERY_AND_PAYMENT_VERBOSE_TOOLTIP')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }>
        <Controller
          name="deliveryAndPaymentsVerbose"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={4}
              placeholder={t('PRICING_PAGE.DELIVERY_AND_PAYMENT_VERBOSE_TOOLTIP')}
            />
          )}
        />
      </Item>

      <Item
        className="!m-0"
        help={errors.publicOfferVerbose?.message}
        validateStatus={errors.publicOfferVerbose && 'error'}
        label={
          <Space size={4}>
            {t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE')}
            <Tooltip title={t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE_TOOLTIP')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }>
        <Controller
          name="publicOfferVerbose"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={4}
              placeholder={t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE_TOOLTIP')}
            />
          )}
        />
      </Item>

      <Item
        className="!m-0"
        help={errors.publicOfferVerbose?.message}
        validateStatus={errors.publicOfferVerbose && 'error'}
        label={
          <Space size={4}>
            {t('PRICING_PAGE.DESCRIPTION_VERBOSE')}
            <Tooltip title={t('PRICING_PAGE.DESCRIPTION_VERBOSE_TOOLTIP')}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        }>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={4}
              placeholder={t('PRICING_PAGE.DESCRIPTION_VERBOSE_TOOLTIP')}
            />
          )}
        />
      </Item>

      <Space>
        <Button onClick={onCancel} disabled={postClientAppConfigStatus === FETCH_STATUS.LOADING}>
          {t('CANCEL')}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="primary"
          loading={postClientAppConfigStatus === FETCH_STATUS.LOADING}
          disabled={postClientAppConfigStatus === FETCH_STATUS.LOADING}>
          {postClientAppConfigStatus === FETCH_STATUS.LOADING ? t('SAVING') : t('SAVE')}
        </Button>
      </Space>
    </Form>
  );
};
