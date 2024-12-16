import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateProductFormSchema = (mode: 'create' | 'edit') => {
  const { t } = useTranslation();

  if (mode === 'create') {
    return z.object({
      title: z
        .string()
        .min(1, { message: t('ERRORS.REQUIRED') })
        .max(100, { message: t('ERRORS.CONTENT_TOO_LONG') }),
      description: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
      // .max(260, { message: t('ERRORS.CONTENT_TOO_LONG') }),
      price: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
    });
  }

  return z.object({
    title: z
      .string()
      .min(1, { message: t('ERRORS.REQUIRED') })
      .max(100, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    description: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
    // .max(260, { message: t('ERRORS.CONTENT_TOO_LONG') }),
    price: z.number().min(1, { message: t('ERRORS.REQUIRED') }),
    categoryId: z.number({ message: t('ERRORS.REQUIRED') }),
  });
};
