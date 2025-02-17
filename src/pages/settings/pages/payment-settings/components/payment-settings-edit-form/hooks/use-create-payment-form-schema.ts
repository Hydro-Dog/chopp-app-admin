import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const useCreatePaymentFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    enteredShopId: z.string().min(1, { message: t('ERRORS.MORE_1_SYMBOL_REQUIRED') }),
  });
};
