import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreatePaymentFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    enteredShopId: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};
