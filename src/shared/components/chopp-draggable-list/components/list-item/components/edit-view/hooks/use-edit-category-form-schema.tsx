import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useEditCategoryFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    title: z.string().min(1, { message: t('ERRORS.REQUIRED') }),
  });
};