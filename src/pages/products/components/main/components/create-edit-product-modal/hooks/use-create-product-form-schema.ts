import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateProductFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    title: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(100, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    description: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
    price: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};

export const useEditProductFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    title: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(100, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    description: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(5000, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    price: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
    categoryId: z.number({ message: t('ERRORS.REQUIRED') }),
  });
};
