import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateBasicInfoFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    publicOfferVerbose: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .nullish(),
    description: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .nullish(),
    phoneNumber: z
      .string()
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, { message: t('ERRORS.PHONE_INVALID_FORMAT') })
      .optional(),
    deliveryAndPaymentsVerbose: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .nullish(),
  });
};
