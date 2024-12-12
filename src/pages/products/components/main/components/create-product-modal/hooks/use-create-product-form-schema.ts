import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateProductFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    title: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(30, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    description: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(260, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    price: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};
