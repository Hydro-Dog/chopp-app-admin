import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const usePaymentSettingsFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    shopId: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};
