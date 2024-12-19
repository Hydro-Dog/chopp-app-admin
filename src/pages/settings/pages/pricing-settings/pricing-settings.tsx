import { FormProvider, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { TitlePage } from '@shared/index';
import { Form, Card } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { z } from 'zod';
import { PriceSettingsView } from './components/price-setting-view/price-settings-view';
import { useCreatePricingFormSchema } from './components/price-settings-edit-form/hooks/use-create-pricing-form-schema';
import { PriceSettingsEditFrom } from './components/price-settings-edit-form/price-settings-edit-form';
import { PriceSettingsTitle } from './components/price-settings-title';

export const PricingSettingsPage = () => {
  const createPricingFormSchema = useCreatePricingFormSchema();
  type CreatePricingFormType = z.infer<typeof createPricingFormSchema>;

  const { control, handleSubmit, reset, ...methodsRest }: UseFormReturn<CreatePricingFormType> =
    useForm<CreatePricingFormType>({
      resolver: zodResolver(createPricingFormSchema),
      defaultValues: {
        averageDeliveryCost: 1,
        freeDeliveryIncluded: false,
        freeDeliveryThreshold: 1,
      },
    });

  const onSubmit: SubmitHandler<CreatePricingFormType> = (data) => {
    console.log(data);
    reset();
  };

  const { value: isEditing, toggle } = useBoolean();
  const { t } = useTranslation();

  return (
    <TitlePage breadcrumbs title={t('PRICING')}>
      <Card
        title={
          <PriceSettingsTitle
            onSubmit={handleSubmit(onSubmit)}
            isEditing={isEditing}
            toggleEditMode={toggle}
          />
        }>
        <FormProvider control={control} handleSubmit={handleSubmit} reset={reset} {...methodsRest}>
          <Form layout="vertical" size="large">
            {isEditing ? <PriceSettingsEditFrom control={control} /> : <PriceSettingsView />}
          </Form>
        </FormProvider>
      </Card>
    </TitlePage>
  );
};
