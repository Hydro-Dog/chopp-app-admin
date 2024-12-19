import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreatePricingFormSchema = () => {
  const { t } = useTranslation();
  return z
    .object({
      averageDeliveryCost: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
      freeDeliveryIncluded: z.boolean(),
      freeDeliveryThreshold: z.number().optional(),
    })
    .refine(
      (data) => {
        if (
          data.freeDeliveryIncluded &&
          (data.freeDeliveryThreshold === undefined || data.freeDeliveryThreshold < 1)
        ) {
          return false;
        }
        return true;
      },
      {
        message: t('ERRORS.FREE_DELIVERY_THRESHOLD_AT_LEAST_1'),
        path: ['freeDeliveryThreshold'],
      },
    );
};
