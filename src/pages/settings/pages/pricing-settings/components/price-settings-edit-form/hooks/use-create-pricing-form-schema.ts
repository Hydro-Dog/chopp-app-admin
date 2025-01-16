import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreatePricingFormSchema = () => {
  const { t } = useTranslation();

  return z
    .object({
      averageDeliveryCost: z.number().nonnegative(t('ERRORS.NO_NEGATIVE')).nullish(),
      freeDeliveryIncluded: z.boolean(),
      freeDeliveryThreshold: z.number().nonnegative(t('ERRORS.NO_NEGATIVE')).nullish(),
    })
    .refine(
      (data) => {
        if (
          data.freeDeliveryIncluded &&
          (data.freeDeliveryThreshold === undefined || Number(data.freeDeliveryThreshold) <= 0)
        ) {
          return false;
        }
        return true;
      },
      {
        message: t('ERRORS.INSERT_FREE_DELIVERY_THRESHOLD'),
        path: ['freeDeliveryThreshold'],
      },
    );
};
