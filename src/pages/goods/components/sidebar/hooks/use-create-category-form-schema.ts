import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateCategoryFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    category: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};
