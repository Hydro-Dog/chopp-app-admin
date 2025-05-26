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
import { Tooltip, Form, Space, Button, Input } from 'antd';
import { z } from 'zod';
import { useCreateBasicInfoFormSchema as useBasicInfoFormSchema } from './hooks/use-basic-info-form-schema';

const { Item } = Form;

type Props = {
  toggle: () => void;
};

export const BasicInfoSettingsEditForm = ({ toggle }: Props) => {
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch();
  const { showErrorNotification } = useNotificationContext();
  const { clientAppConfigData, postClientAppConfigStatus } = useSelector(
    (state: RootState) => state.clientAppConfig,
  );
  const basicInfoFormSchema = useBasicInfoFormSchema();
  type BasicInfoFormType = z.infer<typeof basicInfoFormSchema>;

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm<BasicInfoFormType>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues: {
      publicOfferVerbose: '',
      description: '',
      deliveryAndPaymentsVerbose: '',
    },
  });

  useEffect(() => {
    if (clientAppConfigData) {
      reset({
        publicOfferVerbose: clientAppConfigData.publicOfferVerbose,
        description: clientAppConfigData.description,
        deliveryAndPaymentsVerbose: clientAppConfigData.deliveryAndPaymentsVerbose,
      });
    }
  }, [clientAppConfigData, reset]);

  const onSubmit: SubmitHandler<BasicInfoFormType> = (pricingData) => {
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
              rows={9}
              placeholder={t('PRICING_PAGE.DESCRIPTION_VERBOSE_TOOLTIP')}
            />
          )}
        />
      </Item>

      <Item
        className="!m-0"
        help={errors.description?.message}
        validateStatus={errors.description && 'error'}
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
              rows={9}
              placeholder={t('PRICING_PAGE.DESCRIPTION_VERBOSE_TOOLTIP')}
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
              rows={9}
              placeholder={t('PRICING_PAGE.PUBLIC_OFFER_VERBOSE_TOOLTIP')}
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
